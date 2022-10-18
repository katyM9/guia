// Ejercicio 4.20 Calculadora de Salario

    import java.util.Scanner;

    public class CalculadoradeSalarios{

     public static void main(String[] args)
    {
  
        try (var ent = new Scanner(System.in)) {
            
            int empleado = 1;
            int horas;
            double sueldo, total;

            while ( 3>=empleado)
            { 
                System.out.println();

                System.out.printf("HORAS TRABAJADAS POR EL EMPLEADO "+empleado+": ");
                horas = ent.nextInt();
                System.out.println();

                System.out.printf("SUELDO DEL EMPLEADO "+empleado+": ");
                sueldo = ent.nextDouble();
                System.out.println();

                if ( 40>= horas)
                total = horas*sueldo;
                else
                total = 40*sueldo + (horas-40) * (sueldo + (sueldo/2));

                System.out.printf("SUELDO TOTAL DEL EMPLEADO "+empleado++ +" ES DE: "+ total+" LPS.");
                System.out.println();  System.out.println();
            }
          }
         

    }
}