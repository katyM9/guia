//Ejercicio 4.24 validar la entrada del usuario

import java.util.Scanner; 

public class Entrada{

public static void main(String[] args)
  {
  try (Scanner datos = new Scanner(System.in)) {
    
      int aprobados=0, reprobados=0, contadorEstudiantes=1;

      System.out.println("\nPROGRAMA QUE ANALIZA EL RESULTADO DE LOS EXAMENES DE LOS ESTUDIANTES\nINSTRUCCIONES: DIGITE EL NÚMERO '1' SI EL ESTUDIANTE APROBÓ O DIGITE EL NÚMERO '2' SI EL ESTUDIANTE REPROBÓ");

        while (contadorEstudiantes <= 10){

        System.out.print("\n INGRESE EL RESULTADO: ");
        int resultado = datos.nextInt();
        contadorEstudiantes = contadorEstudiantes + 1;
        
      if (resultado == 1) {
          aprobados = aprobados + 1; 
         
        }else if(resultado==2){
        reprobados = reprobados + 1;
        
        }
       
        } 
       

      System.out.printf("Aprobados: %d%nReprobados: %d%n", aprobados, reprobados);
      
  }
  }
}
