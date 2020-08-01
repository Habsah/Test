using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using TestApi.Enums;

namespace TestApi.Entities
{
    public class User: IdentityUser
    {
        [NotMapped]
        public string Password { get; set; }
        public string Token { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public DateTime BirthDate { get; set; }
        public Genders Gender { get; set; }
    }
}
