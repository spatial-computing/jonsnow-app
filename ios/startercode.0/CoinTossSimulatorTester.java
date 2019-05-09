
public class CoinTossSimulatorTester {
	
	//to test the correctness of CoinTossSimulator.
	public static void main(String [] args) {
		CoinTossSimulator cts=new CoinTossSimulator();
		System.out.println("After Constructor:");
		int [] test=new int[] {0,1,300,20,100};
		//two unit tests with reset after each unit test.
		for(int i=0;i<2;i++) {
			cts.reset();
			int total=0;
			for(int input :test) {
				total+=input;
				cts.run(input);
				System.out.println("Number of Trails [exp: "+total+"]"+cts.getNumTrials());
				System.out.println("Two Heads Tosses: "+cts.getTwoHeads());
				System.out.println("Two Tails Tosses: "+cts.getTwoTails());
				System.out.println("One-head One-Tail tosses: "+cts.getHeadTails());
				String correct=(cts.getHeadTails()+cts.getTwoTails()+cts.getTwoHeads())==cts.getNumTrials()? "true":"false";
				System.out.println("Tosses add up correctly? "+correct);
				System.out.println("");
			}
			if(i==0)
				System.out.println("After Reset:");
		}
	}
}
