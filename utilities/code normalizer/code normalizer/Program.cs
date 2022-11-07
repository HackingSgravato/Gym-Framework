using System.Linq;
using System.Text;
using TextCopy;

internal class Program
{
    private static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            string[]? clipboardText = ClipboardService.GetText()?.Split('\n');
            if (clipboardText is not null)
            {
                Normalize(clipboardText);
            }
            return;
        }

        string[] text = File.ReadAllLines(args[0]);
        Normalize(text);
    }

    private static void Normalize(string[] text)
    {
        StringBuilder formattedCode = new();

        foreach (string line in text)
        {
            string newLine = line.Replace("\"", "\\\"").Replace("\t", "    ").Replace("\r", "").Replace("\n", "");
            formattedCode.AppendLine($"\"{newLine}\",");
        }
        
        ClipboardService.SetText(formattedCode.ToString());
    }
}