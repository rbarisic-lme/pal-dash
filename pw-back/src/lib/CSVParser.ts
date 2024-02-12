/**
 * CSVParser Lib for converting CSV strings to JSON.
 * Example Usage:
 * 
 * const inputString = "name,playeruid,steamid\nLordman381,831301033,76561197989984648\n";
 * const jsonArray = CSVParser.csvToJSON(inputString);
 * console.log(JSON.stringify(jsonArray, null, 2));
 * 
 */

/**
 * Converts a CSV string to an array of JSON objects.
 * @param csvString - The CSV string to be converted.
 * @returns An array of JSON objects representing the CSV data.
 */
export const csvToJSON = (csvString: string): any[] => {
  const lines = csvString.trim().split('\n');
  const header = lines[0].split(',');

  const result = lines.slice(1).map(line => {
    const values = line.split(',');
    const obj: any = {};

    header.forEach((key, index) => {
      obj[key] = values[index];
    });

    return obj;
  });

  return result;
}