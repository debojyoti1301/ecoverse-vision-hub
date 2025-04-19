
import { Coins } from "lucide-react";
import { useState } from "react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const RewardWidget = () => {
  const [ecoCoins, setEcoCoins] = useState(120);
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-eco-light rounded-full hover:bg-eco-light/80 transition-colors relative group">
          <Coins className="text-eco-coin w-5 h-5 animate-float" />
          <span className="font-semibold text-eco-secondary">{ecoCoins}</span>
          <span className="absolute -top-1 -right-1 text-[10px] bg-eco-primary text-white rounded-full px-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            ECO
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">ECO Coins</h3>
            <div className="flex items-center gap-1.5">
              <Coins className="text-eco-coin w-5 h-5" />
              <span className="font-bold text-eco-secondary">{ecoCoins}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Upload pollution images to earn more coins!</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-muted rounded-lg">
                <p className="font-medium">High severity</p>
                <p className="text-eco-primary font-bold">+40 coins</p>
              </div>
              <div className="p-2 bg-muted rounded-lg">
                <p className="font-medium">Medium severity</p>
                <p className="text-eco-primary font-bold">+25 coins</p>
              </div>
              <div className="p-2 bg-muted rounded-lg">
                <p className="font-medium">Low severity</p>
                <p className="text-eco-primary font-bold">+15 coins</p>
              </div>
              <div className="p-2 bg-muted rounded-lg">
                <p className="font-medium">With location</p>
                <p className="text-eco-primary font-bold">+5 bonus</p>
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t border-border">
            <Button className="w-full bg-eco-accent text-eco-secondary hover:bg-eco-accent/90">
              Redeem Rewards
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RewardWidget;
