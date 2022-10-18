//Ejercicio 4.17 Kilometraje de gasolina (cap4)


import java.util.Scanner;

public class Kilometraje{
    
public static void main(String[] args) {

    try (Scanner ent = new Scanner(System.in)) {

        int n, promedio, promgasolina, ga, di;
            
         System.out.print("CANTIDAD DE VIAJES REALIZADOS: ");
         n = ent.nextInt();
            
        int []g=new int[n+2];
        int []d=new int[n+2];
        for(int x=1; x<=n; x++){
        System.out.print("KILOMETROS RECORRIDOS EN SU VIAJE "+x+": ");
        di=ent.nextInt();

        d[x]=di;
        System.out.print("CANTIDAD DE LITROS DE GASOLINA GASTADOS "+x+": ");
        ga=ent.nextInt();
        System.out.println();
        g[x]=ga;}
        
        promedio=d[1];
        promgasolina=g[1];
        System.out.print("VIAJE 1= "+d[1]+"Km/"+g[1]+"Lts \n");

        for(int cs=2;cs<n+1;cs++){
            promedio=(promedio+d[cs])/2;
            promgasolina=(promgasolina+g[cs])/2;
            System.out.print("VIAJE "+cs+"= "+d[cs]+"Km/"+g[cs]+"Lts \n");    
            }

            System.out.println();
            System.out.print("PROMEDIO DE RECURSOS UTILIZADOS: "+promedio+"Km/"+promgasolina+"Lts");
      	    }  
    }  
}
 
