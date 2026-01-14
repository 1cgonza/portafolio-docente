export function crearSlug(titulo: string): string {
  return titulo
    .normalize('NFD') // Descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Eliminar marcas diacríticas (tildes)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Eliminar caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios por guiones
    .trim(); // Eliminar espacios al inicio y al final
}

export function ordenarAños(grouped: Record<number, unknown>, orden: 'asc' | 'desc'): number[] {
  const años = Object.keys(grouped).map((n) => Number(n));
  años.sort((a, b) => (orden === 'asc' ? a - b : b - a));
  return años;
}

export function agruparPorAño<T extends { id: string; data: { año?: number } }>(items: T[]): Record<number, T[]> {
  return items.reduce(
    (acc, item) => {
      const año = item.data.año;
      if (!año) {
        console.warn(`Entrada sin año definido: ${item.id}`);
        return acc;
      }
      if (!acc[año]) acc[año] = [];
      acc[año].push(item);
      return acc;
    },
    {} as Record<number, T[]>
  );
}
