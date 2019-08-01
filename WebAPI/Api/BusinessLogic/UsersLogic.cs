using Api.DTOs;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

namespace Api.BusinessLogic
{
    public class UsersLogic
    {
        private static GHContext _db;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="objDataAccess"></param>
        public UsersLogic(GHContext context)
        {
            _db = context;
        }

        /// <summary>
        /// Returnarea listei tuturor utilizatorilor
        /// </summary>
        /// <param name="page"></param>
        /// <param name="per_page"></param>
        /// <returns></returns>
        public List<UserDetail> GetAllUsers(int page, int per_page)
        {
            List<Users> userList = _db.Users.ToList();
            userList = userList.Skip(page * per_page).Take(per_page).ToList();
            List<UserDetail> userDtoList = new List<UserDetail>();
            UserDetail userDTO;

            foreach (Users u in userList)
            {
                userDTO = new UserDetail
                {
                    Email = u.Email,
                    Password = u.Password,
                    Role = u.Role,
                    UserId = u.UserId
                };

                userDtoList.Add(userDTO);
            }

            return userDtoList.ToList();
        }

        /// <summary>
        /// Returnare rol utilizator
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public string GetUserRole(string email)
        {
            return _db.Users.First(u => u.Email.Equals(email)).Role;
        }

        /// <summary>
        /// Adaugare utilizator
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        public bool AddUser(Users userDTO)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userDTO.Password) || string.IsNullOrWhiteSpace(userDTO.Email))
                {
                    throw new System.Exception("failed");
                }
                else
                {
                    // Adauga un user
                    MD5 md5 = new MD5CryptoServiceProvider();
                    byte[] textToHash = Encoding.Default.GetBytes(userDTO.Password);
                    byte[] result = md5.ComputeHash(textToHash);
                    string passHash = BitConverter.ToString(result);

                    userDTO.Password = passHash;

                    var x = _db.Users.Add(userDTO);
                    _db.SaveChanges();
                    var userId = _db.Users.First(u => u.Email.Equals(userDTO.Email)).UserId;

                    TokenLogic TokenLogic = new TokenLogic(_db);
                    string token = TokenLogic.UpdateToken(userId, userDTO.Email, userDTO.Password);
                    

                    // Trimitere mai verificare
                    SendAuthEmail(token, userDTO.FirstName, userDTO.Email);

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }           
        }

        public void RecoverPassword(string email)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(email))
                {
                    throw new System.Exception("failed");
                }
                else
                {
                    var user = _db.Users.First(u => u.Email.Equals(email));

                    TokenLogic TokenLogic = new TokenLogic(_db);
                    string token = TokenLogic.UpdateToken(user.UserId, user.Email, user.Password);

                    SendRecoverEmail(token, user.FirstName, user.Email);
                }
            }
            catch (Exception ex)
            {

            }
        }

        public bool ChangePassword(string token, string password)
        {
            var authToken = token;
            try
            {
                if (string.IsNullOrWhiteSpace(password))
                {
                    throw new System.Exception("failed");
                }
                else
                {
                    // Actualizaeaza un user
                    MD5 md5 = new MD5CryptoServiceProvider();
                    byte[] textToHash = Encoding.Default.GetBytes(password);
                    byte[] result = md5.ComputeHash(textToHash);
                    string passHash = BitConverter.ToString(result);
               
                    var userId = _db.Tokens.First(u => u.TokenString.Equals(authToken)).UserId;
                    var user = _db.Users.First(u => u.UserId == userId);
                    user.Password = passHash;
                    _db.Users.Update(user);
                    _db.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        /// <summary>
        /// Cautare user dupa id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserDetail GetUser(int id)
        {
            Users user = _db.Users.First(u => u.UserId == id);
            UserDetail userDTO = new UserDetail
            {
                Password = user.Password,
                Email = user.Email,
                Role = user.Role,
                UserId = user.UserId
            };

            return userDTO;
        }

        /// <summary>
        /// Stergere utilizator
        /// </summary>
        /// <param name="id"></param>
        public void DeleteUser(int id)
        {
            // Sterge user dupa id, dar care difera de contul de admin "Admin" care nu poate fi sters niciodata
            Users u = _db.Users.First(user => user.UserId == id && user.Role != "Admin");
            if (null == u)
            {
                throw new Exception("'Admin' cannot be deleted");
            }
            _db.Users.Remove(u);
        }

        /// <summary>
        /// Stergere utilizator
        /// </summary>
        /// <param name="userDTO"></param>
        public void DeleteUser(UserDetail userDTO)
        {
            if (userDTO.Role == "Admin")
            {
                throw new Exception("'Admin' cannot be deleted");
            }

            Users user = new Users
            {
                Password = userDTO.Password,
                Email = userDTO.Email,
                Role = userDTO.Role
            };
            _db.Users.Remove(user);
        }

        /// <summary>
        /// Cautare id user
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public int GetUserID(string email)
        {
            return _db.Users.First(user => user.Email.Equals(email)).UserId;
        }

        /// <summary>
        /// Cautare nume user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetEmail(int id)
        {
            return _db.Users.First(user => user.UserId == id).Email;
        }

        /// <summary>
        /// Promovare utilizator
        /// </summary>
        /// <param name="id"></param>
        public void PromoteUser(int id)
        {
            // User devine admin
            Users u = _db.Users.First(user => user.UserId == id);
            ChangeRole(id, "admin");
        }

        public void DemoteUser(int id)
        {
            // Admin devine user
            Users u = _db.Users.First(user => user.UserId == id && user.Role != "Admin");
            if (null == u)
            {
                throw new Exception("'Admin' cannot be demote");
            }
            ChangeRole(id, "user");
        }

        private void ChangeRole(int id, string role)
        {
            Users u = _db.Users.Find(id);
            u.Role = role;

            _db.Users.Update(u);
        }


        /// <summary>
        /// Trimitere mail de confirmare
        /// </summary>
        /// <param name="token"></param>
        /// <param name="username"></param>
        /// <param name="email"></param>
        public void SendAuthEmail(string token, string firstName, string email)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("habetgabriel@gmail.com");
            mail.To.Add(email);
            mail.Subject = "Welcome to GabrielHabet";
            mail.Body = "<h3>Hello " + firstName + ", </h3>";
            mail.Body +=
                "<p>Thanks for signing up! Before you start, please verify your email address by clicking <a href=\"http://gabrielhabet.co.uk/#/verify/" +
                token + "\">here</a>.</p>";
            mail.Body += "<p>This link will expire in 24 hours if it's not activated.</p>";
            mail.Body += "<h5>The GabrielHabet team</h5>";
            mail.IsBodyHtml = true;

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("habetgabriel@gmail.com", "habetpassword"); 
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);
        }

        /// <summary>
        /// Trimitere mail de confirmare
        /// </summary>
        /// <param name="token"></param>
        /// <param name="username"></param>
        /// <param name="email"></param>
        public void SendRecoverEmail(string token, string firstName, string email)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("habetgabriel@gmail.com");
            mail.To.Add(email);
            mail.Subject = "Reset password";
            mail.Body = "<h3>Hello " + firstName + ", </h3>";
            mail.Body +=
                "<p>Let's reset your password. Reset password by clicking <a href=\"http://gabrielhabet.co.uk/#/reset_password/" +
                token + "\">here</a>.</p>";
            mail.Body += "<p>If you did not ask to reset your password you may want to review your recent account access for any unusual activity. We're here to help if you need it. Visit the Help Center for more info or contact us.</ p>";
            mail.Body += "<h5>The GabrielHabet team</h5>";
            mail.IsBodyHtml = true;

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("habetgabriel@gmail.com", "habetpassword");
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);
        }

        /// <summary>
        /// Actualizare conturi si sondaje
        /// </summary>
        public void ScheduledJobs()
        {
          //  _dataAccess.UserRepository.ScheduleDeleteUsers();
        }
    }
}