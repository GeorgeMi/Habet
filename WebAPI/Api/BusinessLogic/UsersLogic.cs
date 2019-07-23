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
        private GHContext _db;

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
                    Password = u.Pass,
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
        public int AddUser(UserRegistration userDTO)
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

                Users user = new Users()
                {
                    Pass = passHash,
                    Email = userDTO.Email,
                    Role = "user",
                    Verified = "no"
                };
                _db.Users.Add(user);

                return _db.Users.First(u => u.Email.Equals(userDTO.Email)).UserId;
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
                Password = user.Pass,
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
                Pass = userDTO.Password,
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
        public void SendAuthEmail(string token, string username, string email)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("gabrielhabet@gmail.com");
            mail.To.Add(email);
            mail.Subject = "Welcome to GabrielHabet";
            mail.Body = "<h3>Hello " + username + ", </h3>";
            mail.Body +=
                "<p>Thanks for signing up! Before you start, please verify your email address by clicking <a href=\"http://gabrielhabet.co.uk/#/auth/?verifymail=" +
                token + "\">here</a>.</p>";
            mail.Body += "<p>This link will expire in 24 hours if it's not activated.</p>";
            mail.Body += "<h5>The GabrielHabet team</h5>";
            mail.IsBodyHtml = true;

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("gabrielhabet@gmail.com", "Habetpassword123");
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