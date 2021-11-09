export const fahrenheitToCelcius = (fahrenheit) => {
    return parseFloat(((fahrenheit - 32) * 5) / 9).toFixed(2);
};

export const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}