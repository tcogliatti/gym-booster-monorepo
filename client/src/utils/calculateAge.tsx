export function calculateAge(birthDateString: Date): number {
    const birthDate = new Date(birthDateString);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    // Ajusta si el mes actual es antes del mes de nacimiento o si es el mismo mes pero el día aún no ha pasado
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }
  