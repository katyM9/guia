// types.ts
export type RootStackParamList = {
    Alergias: undefined;  // La pantalla de Alergias no recibe parámetros
    AgregarAlergias: { alergia?: any };  // La pantalla de AgregarAlergias puede recibir un objeto "alergia"

    ChequeoDiario: undefined;
    AgregarChequeoDiario: { chequeo?: any };  // La pantalla de AgregarChequeoDiario puede recibir un chequeo
  };
  