using Api.Models;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Api.BusinessLogic
{
    public class AuthLogic
    {
        private GHContext _db;
        private TokenLogic TokenLogic;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="objDataAccess"></param>
        public AuthLogic(GHContext context)
        {
            _db = context;
            TokenLogic = new TokenLogic(context);
        }
        /// <summary>
        /// Verifica daca in baza de date exista un tuplu ce corespunde cu datele introduse
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        private int Validate(string email, string password)
        {
            try
            {
                // Creez token string
                MD5 md5 = new MD5CryptoServiceProvider();
                byte[] textToHash = Encoding.Default.GetBytes(password);
                byte[] result = md5.ComputeHash(textToHash);
                string passHash = BitConverter.ToString(result);
                return _db.Users.First(user => user.Email.Equals(email) && user.Password.Equals(passHash) && user.Verified == "yes").UserId;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        /// <summary>
        /// Daca userul si pass carespund se updateaza tokenul in baza de date si se intoarce stringul updatat
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public string Authenticate(string email, string password)
        {
            int userID = Validate(email, password);

            if (userID == -1)
            {
                return null;
            }
            else
            {
                string token = TokenLogic.UpdateToken(userID, email, password);
                return token;
            }
        }

        /// <summary>
        /// Verifica daca tokenul corespunde cu cel trimis prin mail
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public bool VerifyMailToken(string token)
        {
            int userId;

            try
            {
                bool verify = VerifyTokenDate(token);

                if (verify)
                {
                    // Se updateaza contul userului, verified => true
                    userId = _db.Tokens.First(t => t.TokenString.Equals(token)).UserId;
                    Verified(userId);
                    return true;
                }
                else
                {
                    // Tokenul nu corespunde
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        private void Verified(int userId)
        {
            Users u = _db.Users.Find(userId);
            u.Verified = "yes";

            _db.Users.Update(u);
            _db.SaveChanges();
        }

        /// <summary>
        /// Verifica disponibilitatea numelui si introduce un nou user in baza de date
        /// <param name="password"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        public string Register(string email, string password)
        {
            try
            {
                // Creez token string
                MD5 md5 = new MD5CryptoServiceProvider();
                byte[] textToHash = Encoding.Default.GetBytes(password);
                byte[] result = md5.ComputeHash(textToHash);
                string passHash = BitConverter.ToString(result);

                // Incearca sa adauge un nou user
                Users user = new Users() { Password = passHash, Email = email, Role = "user" };
                _db.Users.Add(user);
            }
            catch
            {
                // Numele exista deja in baza de date
                return "Name already exists";
            }

            var userID = Validate(email, password);
            if (userID == -1)
            {
                return "register failed";
            }
            else
            {
                return "register successfully";
            }
        }

        /// <summary>
        /// Verifica tokenul din baza de date. 
        /// </summary>
        /// <param name="tokenString"></param>
        /// <returns></returns>
        public bool VerifyTokenDate(string tokenString)
        {
            // Daca nu exista sau este expirat->eroare. 
            // Altfel se updateaza data de expirare si se intoarce ok
            try
            {
                DateTime? expirationDate = TokenLogic.GetTokenExpirationDate(tokenString);
                if (expirationDate?.CompareTo(DateTime.Now) != 1)
                {
                    // Token-ul este expirat
                    return false;
                }
                else
                {
                    TokenLogic.UpdateTokenExpirationDate(tokenString);
                    return true;
                }
            }
            catch (Exception ex)
            {
                // Token-ul nu exista in baza de date
                return false;
            }
        }

        /// <summary>
        /// Verifica daca userul cu tokenul tokenString este sau nu admin
        /// </summary>
        /// <param name="tokenString"></param>
        /// <returns></returns>
        public bool VerifyAdminToken(string tokenString)
        {
            try
            {
                string role = TokenLogic.GetRoleByToken(tokenString);

                if (role == "admin")
                {
                    // userul este admin
                    return true;
                }
                else
                {
                    // userul nu este admin
                    return false;
                }
            }
            catch (Exception ex)
            {
                // userul nu exista
                return false;
            }
        }
    }
}