// Name:
// USC NetID:
// CS 455 PA1
// Fall 2018

/**
 * class CoinTossSimulator
 * 
 * Simulates trials of repeatedly tossing two coins and allows the user to access the
 * cumulative results.
 * 
 * NOTE: we have provided the public interface for this class.  Do not change
 * the public interface.  You can add private instance variables, constants, 
 * and private methods to the class.  You will also be completing the 
 * implementation of the methods given. 
 * 
 * Invariant: getNumTrials() = getTwoHeads() + getTwoTails() + getHeadTails()
 * 
 */
import java.util.Random;

public class CoinTossSimulator {


	private int totalTrials;
	private int twoHeads;
	private int twoTails;
	private int headTails;
	private Random r;
   /**
      Creates a coin toss simulator with no trials done yet.
   */
   public CoinTossSimulator() {
	   totalTrials=0;
	   twoHeads=0;
	   twoTails=0;
	   headTails=0;
	   r=new Random();
			   
   }


   /**
      Runs the simulation for numTrials more trials. Multiple calls to this method
      without a reset() between them *add* these trials to the current simulation.
      
      @param numTrials  number of trials to for simulation; must be >= 1
    */
   public void run(int numTrials) {
	   for(int i=0;i<numTrials;i++) {
		   int random=r.nextInt(4);
		   if(random==0)
			   twoHeads++;
		   else if(random==1)
			   twoTails++;
		   else 
			   headTails++;
		   totalTrials++;
	   }
   }


   /**
      Get number of trials performed since last reset.
   */
   public int getNumTrials() {
       return totalTrials; 
   }


   /**
      Get number of trials that came up two heads since last reset.
   */
   public int getTwoHeads() {
       return twoHeads; 
   }


   /**
     Get number of trials that came up two tails since last reset.
   */  
   public int getTwoTails() {
       return twoTails; 
   }


   /**
     Get number of trials that came up one head and one tail since last reset.
   */
   public int getHeadTails() {
       return headTails; 
   }


   /**
      Resets the simulation, so that subsequent runs start from 0 trials done.
    */
   public void reset() {
	   headTails=0;
	   twoTails=0;
	   twoHeads=0;
	   totalTrials=0;
   }

}
