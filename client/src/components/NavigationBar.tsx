import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Cloud, 
  Leaf, 
  TrendingUp, 
  MessageCircle, 
  User,
  Menu,
  X,
  Mic,
  Languages
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  malayalam: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: number;
}

export default function NavigationBar() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Navigation items - todo: remove mock functionality
  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      malayalam: "ഹോം",
      icon: <Home className="w-5 h-5" />
    },
    {
      id: "weather",
      label: "Weather",
      malayalam: "കാലാവസ്ഥ",
      icon: <Cloud className="w-5 h-5" />,
      badge: 2
    },
    {
      id: "detect",
      label: "Detect",
      malayalam: "നിർണയം",
      icon: <Leaf className="w-5 h-5" />
    },
    {
      id: "market",
      label: "Market",
      malayalam: "വിപണി",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: "chat",
      label: "Chat",
      malayalam: "ചാറ്റ്",
      icon: <MessageCircle className="w-5 h-5" />,
      badge: 1
    }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    console.log(`Navigation tab clicked: ${tabId}`);
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    console.log(`Voice assistant ${!isVoiceActive ? 'activated' : 'deactivated'}`);
  };

  const handleLanguageToggle = () => {
    console.log('Language toggle clicked');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Top Navigation Bar - Desktop */}
      <nav className="hidden md:flex items-center justify-between p-4 bg-background border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">Kerala Farming Assistant</h1>
              <p className="text-xs text-muted-foreground">കേരള കൃഷി സഹായി</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant={isVoiceActive ? "default" : "outline"}
            size="sm"
            onClick={handleVoiceToggle}
            className="gap-2"
            data-testid="button-voice-toggle"
          >
            <Mic className="w-4 h-4" />
            Voice
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleLanguageToggle}
            className="gap-2"
            data-testid="button-language-toggle"
          >
            <Languages className="w-4 h-4" />
            മലയാളം
          </Button>

          <Button
            variant="ghost"
            size="icon"
            data-testid="button-profile"
            onClick={() => console.log('Profile clicked')}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-background border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground text-sm">Farming Assistant</h1>
            <p className="text-xs text-muted-foreground">കൃഷി സഹായി</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isVoiceActive ? "default" : "outline"}
            size="icon"
            onClick={handleVoiceToggle}
            data-testid="button-voice-mobile"
          >
            <Mic className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            data-testid="button-menu-toggle"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-50 p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-foreground">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              data-testid="button-close-menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start gap-3 h-12"
                onClick={() => {
                  handleTabClick(item.id);
                  toggleMenu();
                }}
                data-testid={`button-nav-${item.id}`}
              >
                {item.icon}
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.malayalam}</div>
                </div>
                {item.badge && (
                  <Badge variant="destructive" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleLanguageToggle}
              data-testid="button-language-mobile"
            >
              <Languages className="w-4 h-4" />
              Switch to English / മലയാളം
            </Button>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 z-40">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              size="sm"
              className="flex-col gap-1 h-16 relative"
              onClick={() => handleTabClick(item.id)}
              data-testid={`button-bottom-nav-${item.id}`}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
              {item.badge && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 text-xs w-5 h-5 flex items-center justify-center p-0"
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}