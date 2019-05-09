import java.util.Scanner;

import javax.swing.JFrame;

public class CoinSimViewer {
	   private static Integer runtimes;
	   static CoinTossSimulator cts=new CoinTossSimulator();
	   
	   //to draw the simulation result from CoinTossSimulator.
	   //enter the valid number of toss in the terminal.
	   public static void main(String[] args)
	   {
	      JFrame frame = new JFrame();
		  Scanner sc=new Scanner(System.in);
		  
		  //check the input whether it is validate.
		  //when change the size of graphic, it will re-render,but we do not need
		  //to run the simulator again.
		  if(runtimes==null) {
			  System.out.print("Please enter the number of trails: ");
			  int input=sc.nextInt();
			  while(input<=0) {
				  System.out.println("Enter number of trials: "+input);
				  System.out.println("ERROR: Number entered must be greater than 0.");
				  System.out.print("Please enter the number of trails: ");
				  input=sc.nextInt();
			  }
			  sc.close();
			  System.out.println("Enter number of trials: "+input);
			  runtimes=input;
			  cts.run(runtimes);
		  }
		  
	      frame.setSize(800, 500);
	      frame.setTitle("CoinSim");
	      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	      CoinSimComponent component = new CoinSimComponent();
	      frame.add(component);
	      frame.setVisible(true);
	   }
}
