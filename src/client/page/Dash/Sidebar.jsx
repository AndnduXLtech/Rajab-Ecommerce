import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Sidebar({ items, isOpen, currentView, onNavigate }) {
  return (
    <div className="py-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={currentView === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start mb-1",
              !isOpen && "justify-center"
            )}
            onClick={() => onNavigate(item.id)}
          >
            <Icon className="h-5 w-5 mr-2" />
            {isOpen && <span>{item.label}</span>}
          </Button>
        );
      })}
    </div>
  );
}

export default Sidebar;
