//ejercicio 4.37


        import java.util.Scanner;

        public class FactorialNumero {

         public static void main(String[] args) {
        
            long factorial=1;
            int n;
            try (Scanner numero = new Scanner(System.in)) {
                System.out.print( "INGRESE UN NUMERO: " );
                n = numero.nextInt();
            }
                for (int i = n; i > 0; i--) {
                    factorial = factorial * i;
                }
            System.out.println("EL FACTORIAL DE " + n + " ES: " + factorial);
        }
}
