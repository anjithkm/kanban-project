export const camalizeEachWords = (str: string) => {
    const splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].trim().charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  };

export function camalizeEachSentance(str: string){
    const splitStr = str.toLowerCase().split(".");
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].trim().charAt(0).toUpperCase() + splitStr[i].trim().substring(1);
    }
    // Directly return the joined string
    return splitStr.join(". ");
};

export function truncate (input: string, length?: number) {
    return input.length > 10 ? `${input.substring(0, length || 10)}...` : input;
}