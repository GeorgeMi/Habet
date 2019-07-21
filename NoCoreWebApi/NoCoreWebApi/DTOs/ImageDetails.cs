using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoCoreWebApi.DTOs
{
    public class ImageDetails
    {
        public byte[] Name { get; set; }
        public byte[] Data { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string ContentType { get; set; }
    }
}
