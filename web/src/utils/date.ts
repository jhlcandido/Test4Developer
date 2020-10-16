export const convertToFormatedDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) => new Intl.DateTimeFormat("pt-BR", { ...options }).format(date);
