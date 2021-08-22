export const tokenExpires = (tokenDateExp: string): boolean => {
    if (!tokenDateExp) return false;
    const [date, hours] = tokenDateExp.split(' ')
    const [day, month, year] = date.split('/')
    const [hour, min, secs] = hours.split(':')
    const tokenExpFormatted = new Date(+year, +month - 1, +day, +hour, +min, +secs)
    return new Date() > tokenExpFormatted;
}