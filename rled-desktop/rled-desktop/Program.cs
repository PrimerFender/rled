using System;
using System.Diagnostics;
using System.IO.Ports;
using System.Threading;

namespace rled_desktop
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] sPorts = SerialPort.GetPortNames();
            Console.WriteLine(String.Join("\n", sPorts));
            Console.WriteLine("Enter your name:");
            string name = Console.ReadLine();

            SerialPort sPort = new SerialPort(sPorts[0], 96000);
            sPort.Open();
            if (sPort.IsOpen == true)
            {
                Console.WriteLine("Port is Open");
                // sPort.WriteLine("#FF0000");
                Blink(sPort, "red", 5);
            }
            else
            {
                Console.WriteLine("Ooops. Not Open.");
            }
        }

        static void Blink(SerialPort sPort, string Color, int seconds)
        {
            string ColorBlank = "#000000";
            string HexColor = "";
            switch (Color.ToLower())
            {
                case "red":
                    HexColor = "#FF0000";
                    break;
                case "green":
                    HexColor = "#00FF00";
                    break;
                default:
                    HexColor = "#000000";
                    break;
            }

            Stopwatch sw = new Stopwatch();
            sw.Start();

            while (sw.ElapsedMilliseconds < seconds * 1000)
            {
                sPort.WriteLine(HexColor);
                Thread.Sleep(500);
                sPort.WriteLine(ColorBlank);
                Thread.Sleep(500);
            }
        }
    }
}
