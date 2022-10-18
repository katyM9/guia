//Ejercicio 2.31 tabla de cuadrados y cubos (cap2)

public class tablas {
    
    public static void main(String[] args) throws Exception {
      
        int cuadrado, cubo;

      for(int i=0; i<=10; i++){

        cuadrado= i*i;
        System.out.print(+i+ " AL CUADRADO: ");
        System.out.println(+cuadrado);
      
        
      }
      
    for(int i=0; i<=10; i++){
        cubo = i*i*i;
        System.out.print(+i+" AL CUBO: ");
        System.out.println(+cubo);
    }
      
    }
}
