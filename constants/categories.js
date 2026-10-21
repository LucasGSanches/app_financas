export const CATEGORIES = [
  { label: "Alimentação", value: "alimentacao" },
  { label: "Transporte", value: "transporte" },
  { label: "Moradia", value: "moradia" },
  { label: "Saúde", value: "saude" },
  { label: "Educação", value: "educacao" },
  { label: "Lazer", value: "lazer" },
  { label: "Salário", value: "salario" },
  { label: "Outros", value: "outros" },
];

// Converte o value salvo ("alimentacao") no texto exibido ("Alimentação")
export function category_label(value) {
  const category = CATEGORIES.find((c) => c.value === value);
  return category ? category.label : value;
}