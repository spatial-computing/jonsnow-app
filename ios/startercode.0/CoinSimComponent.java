import java.awt.Graphics;
import java.awt.Graphics2D;

import javax.swing.JComponent;
import java.awt.Color;

public class CoinSimComponent extends JComponent {
	//some constant value in this class
	//width and height of graph is not included since it will change with the graph window.
	private static final Color COLOR_HEADTAIL=Color.GREEN;
	private static final Color COLOR_TWOHEADS=Color.RED;
	private static final Color COLOR_TWOTIALS=Color.BLUE;
	private static final String STIRNG_HEADTAIL="A Head and A Tail: ";
	private static final String STRING_TAILS="Two Tails: ";
	private static final String STRING_HEADS="Two Heads: ";
	
	// paint every bar of the simulation result.
	protected void paintComponent(Graphics g) {
		Graphics2D g2 = (Graphics2D) g;
		int totalHeight=getHeight();
		int totalWidth=getWidth();
		int bottom=totalHeight/5*4;
		int left=totalWidth/7;
		int width=totalWidth/7; //split the width of bars and gaps evenly.

		CoinTossSimulator cts=CoinSimViewer.cts;
		double scale=((double)bottom)/cts.getNumTrials();
		String twoTails=STRING_TAILS+cts.getTwoTails()+" ("+Math.round((double)cts.getTwoTails()*100/cts.getNumTrials())+"%)";
		String twoHeads=STRING_HEADS+cts.getTwoHeads()+" ("+Math.round((double)cts.getTwoHeads()*100/cts.getNumTrials())+"%)";
		String headTails=STIRNG_HEADTAIL+cts.getHeadTails()+" ("+(100-Math.round((double)cts.getTwoTails()*100/cts.getNumTrials())-Math.round((double)cts.getTwoHeads()*100/cts.getNumTrials()))+"%)";
		
		Bar bar1=new Bar(bottom,left,width,cts.getTwoTails(),scale,COLOR_TWOTIALS,twoTails);
		Bar bar2=new Bar(bottom,left*3,width,cts.getHeadTails(),scale,COLOR_HEADTAIL,headTails);
		Bar bar3=new Bar(bottom,left*5,width,cts.getTwoHeads(),scale,COLOR_TWOHEADS,twoHeads);
		bar1.draw(g2);
		bar2.draw(g2);
		bar3.draw(g2);
		
	}
	
}
