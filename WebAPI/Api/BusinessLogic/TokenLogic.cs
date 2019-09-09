using System;
using System.Linq;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
using System.Text;
using Api.Models;

namespace Api.BusinessLogic
{
    public class TokenLogic
    {
        private GHContext db;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="objDataAccess"></param>
        public TokenLogic(GHContext context)
        {
            db = context;
        }
        /// <summary>
        /// Adaugare token
        /// </summary>
        /// <param name="token"></param>
        public void AddToken(Tokens token)
        {
            db.Tokens.Add(token);
        }

        /// <summary>
        /// Returnare token
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Tokens GetToken(int id)
        {
            return db.Tokens.First(token => token.TokenId == id);
        }
        /// <summary>
        /// Returnare id token
        /// </summary>
        /// <param name="tokenString"></param>
        /// <returns></returns>
        public int GetTokenID(string tokenString)
        {
            return db.Tokens.First(token => token.TokenString == tokenString).TokenId;
        }
        /// <summary>
        /// Returnare id token
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Tokens GetTokenByUserID(int id)
        {
            return db.Tokens.First(token => token.UserId == id);
        }

        /// <summary>
        /// Returnare rol
        /// </summary>
        /// <param name="tokenString"></param>
        /// <returns></returns>
        public string GetRoleByToken(string tokenString)
        {
            int userID = db.Tokens.First(token => token.TokenString == tokenString).UserId;
            return db.Users.First(user => user.UserId == userID).Role;
        }

        /// <summary>
        /// Actualizare token
        /// </summary>
        /// <param name="id"></param>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public string UpdateToken(int id, string username, string password)
        {
            Tokens t;
            string text;
            MD5 md5;
            byte[] textToHash;
            byte[] result;

            try
            {
                // Daca exista un token pentru user preiau obiectul
                t = GetTokenByUserID(id);
                var createdDate = DateTime.Now;
                var expirationDate = DateTime.Now.AddHours(3);

                // Preiau adresa mac
                var MAC = NetworkInterface.GetAllNetworkInterfaces().Where(nic => nic.OperationalStatus == OperationalStatus.Up).Select(nic => nic.GetPhysicalAddress().ToString()).FirstOrDefault();

                // Creez token string
                text = t.TokenId + username + password + createdDate + MAC;

                md5 = new MD5CryptoServiceProvider();
                textToHash = Encoding.Default.GetBytes(text);
                result = md5.ComputeHash(textToHash);

                // Conversie la string 
                text = BitConverter.ToString(result);

                try
                {
                    // Verificare update
                    UpdateToken(t.TokenId, createdDate, expirationDate, text);                    
                }
                catch (Exception ex)
                {
                    return ex.InnerException.InnerException.Message;
                }
                return text;

            }
            catch
            {
                t = new Tokens();
                t.UserId = id;

                t.CreatedDate = DateTime.Now;
                t.ExpirationDate = t.CreatedDate?.AddHours(3);

                // Creez token string
                text = t.TokenId + username + t.CreatedDate;

                md5 = new MD5CryptoServiceProvider();
                textToHash = Encoding.Default.GetBytes(text);
                result = md5.ComputeHash(textToHash);

                // Conversie la string 
                t.TokenString = BitConverter.ToString(result);

                try
                {
                    // Verificare inserare
                    db.Tokens.Add(t);
                }
                catch (Exception ex)
                {
                    return ex.InnerException.InnerException.Message;
                }

                db.SaveChanges();
                return t.TokenString;
            }
        }

        private void UpdateToken(int tokenId, DateTime createdDate, DateTime expirationDate, string text)
        {
            Tokens t = db.Tokens.Find(tokenId);
            t.CreatedDate = createdDate;
            t.ExpirationDate = expirationDate;
            t.TokenString = text;

            db.Tokens.Update(t);
            db.SaveChanges();
        }

        /// <summary>
        /// Returnare data expirare token
        /// </summary>
        /// <param name="tokenString"></param>
        /// <returns></returns>
        public DateTime? GetTokenExpirationDate(string tokenString)
        {
            return db.Tokens.First(token => token.TokenString == tokenString).ExpirationDate;
        }

        /// <summary>
        /// Actualizare data expirare
        /// </summary>
        /// <param name="tokenString"></param>
        public void UpdateTokenExpirationDate(string tokenString)
        {
            int id = GetTokenID(tokenString);
            UpdateExpirationDate(id, DateTime.Now.AddHours(3));
        }

        private void UpdateExpirationDate(int id, DateTime dateTime)
        {
            Tokens t = db.Tokens.Find(id);
            t.ExpirationDate = dateTime;

            db.Tokens.Update(t);
        }
    }
}