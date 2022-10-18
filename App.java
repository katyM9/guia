//Ejercicio 2.15 (cap2)

import javax.swing.JOptionPane;

public class App {


    public static void main(String[] args) throws Exception {

        int n1, n2;


    n1 = Integer.parseInt(JOptionPane.showInputDialog("INGRESE UN NUMERO: "));
    n2 = Integer.parseInt(JOptionPane.showInputDialog("INGRESE OTRO NUMERO: "));

    System.out.println();
    JOptionPane.showMessageDialog(null, "LA SUMA DE LOS NUMEROS: "+(n1+n2));
    JOptionPane.showMessageDialog(null, "RESTA DE LOS NUMEROS: "+(n1-n2));
    JOptionPane.showMessageDialog(null, "COCIENTE DE LOS NUMEROS: "+(n1/n2));
    JOptionPane.showMessageDialog(null, "MULTIPLICACION DE LOS NUMEROS: "+(n1*n2));   
    }
}
