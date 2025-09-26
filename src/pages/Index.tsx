import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Search, Lightbulb, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [ideaForm, setIdeaForm] = useState({
    title: "",
    category: "",
    details: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [ideaResult, setIdeaResult] = useState("");
  const [showIdeaResult, setShowIdeaResult] = useState(false);

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bullets = [
      `Hook: a 5-second opener showing the key pain point in ${ideaForm.category}.`,
      `Structure: 3 segments (Problem → Insight → Action) in under 45 seconds.`,
      `Visuals: dynamic cuts with on-screen keywords from "${ideaForm.title}".`,
      `CTA: invite viewers to comment their experience; pin 2 top responses.`,
      `Repurpose: turn the script into a thread and carousel post.`
    ];

    const result = `
      <strong>Working Title:</strong> ${ideaForm.title}<br/>
      <strong>Angle:</strong> ${ideaForm.details.slice(0, 160)}...<br/><br/>
      <ul>${bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    `;
    
    setIdeaResult(result);
    setShowIdeaResult(true);
    
    toast({
      title: "Ideas Generated!",
      description: "Your content suggestions are ready.",
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Simulate AI search response based on query type
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let response = "";
      
      if (searchQuery.toLowerCase().includes("news") || searchQuery.toLowerCase().includes("breaking") || searchQuery.toLowerCase().includes("latest")) {
        response = `# Latest News: ${searchQuery}

Based on current information, here's what I found:

## Key Headlines
• Breaking developments in the topic you searched for
• Latest updates from reliable news sources
• Expert analysis and commentary
• Timeline of recent events

## Detailed Analysis
This comprehensive overview covers the most important aspects of your news query. The information is gathered from multiple verified sources to provide you with accurate, up-to-date content.

**Sources:** Reuters, BBC, Associated Press, CNN
**Last Updated:** ${new Date().toLocaleDateString()}`;
      } else if (searchQuery.toLowerCase().includes("skincare") || searchQuery.toLowerCase().includes("product") || searchQuery.toLowerCase().includes("review")) {
        response = `# Product Information: ${searchQuery}

## Product Overview
Here's detailed information about the products you're looking for:

## Top Recommendations
• **Premium Choice:** High-end option with proven results
• **Best Value:** Quality product at competitive price
• **Budget-Friendly:** Affordable yet effective alternative

## Key Features & Benefits
• Scientifically proven ingredients
• Suitable for various skin types
• Positive user reviews and ratings
• Available through trusted retailers

## User Reviews
Based on thousands of customer reviews, these products consistently deliver excellent results with minimal side effects.

**Rating:** 4.5/5 stars
**Price Range:** $15-$150`;
      } else {
        response = `# Information About: ${searchQuery}

## Overview
Here's comprehensive information about your query:

## Key Points
• Detailed explanation of the topic
• Important facts and figures
• Latest developments and trends
• Expert insights and analysis

## Additional Context
This information is compiled from multiple reliable sources to give you a complete understanding of the topic you're interested in.

## Related Topics
You might also be interested in exploring related subjects that connect to your search query.

**Last Updated:** ${new Date().toLocaleDateString()}`;
      }
      
      setSearchResult(response);
      
      toast({
        title: "Search Complete!",
        description: "AI has found detailed information for your query.",
      });
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to get search results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/70 to-blue-900/80"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-md bg-blue-900/30 border-b border-blue-400/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white tracking-wide">MediaLens</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#search" className="text-blue-200 hover:text-white transition-colors">Search</a>
            <a href="#ideas" className="text-blue-200 hover:text-white transition-colors">Ideas</a>
            <a href="#analyze" className="text-blue-200 hover:text-white transition-colors">Analyze</a>
          </nav>
          <div className="flex space-x-3">
            <Button variant="ghost" className="text-white border-white/25 hover:bg-white/10">
              Sign in
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-400 text-white">
              Create account
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Stay connected. Create standout ideas.
        </h1>
        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
          AI-powered search, content ideas, and media analysis for creators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white px-8">
            <Search className="mr-2 h-5 w-5" />
            Start Searching
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
            <Lightbulb className="mr-2 h-5 w-5" />
            Get Ideas
          </Button>
        </div>
      </section>

      {/* AI Search Section */}
      <section id="search" className="relative z-10 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="backdrop-blur-md bg-blue-900/40 border-blue-400/30 p-8">
            <div className="text-center mb-8">
              <Search className="mx-auto h-12 w-12 text-blue-400 mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">AI-Powered Search</h2>
              <p className="text-blue-200">
                Ask about anything - news, products, or any topic. Get detailed, comprehensive information.
              </p>
            </div>
            
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask about news, skincare products, or any topic..."
                  className="bg-blue-900/50 border-blue-400/30 text-white placeholder:text-blue-300 text-lg py-4"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSearching}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-8"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </form>

            {searchResult && (
              <div className="mt-8 p-6 bg-blue-900/60 border border-blue-400/30 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Search Results</h3>
                <div className="prose prose-invert max-w-none">
                  <div 
                    className="text-blue-100 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: searchResult.replace(/\n/g, '<br>') }}
                  />
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Ideas Section */}
      <section id="ideas" className="relative z-10 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="backdrop-blur-md bg-blue-900/40 border-blue-400/30 p-8">
            <div className="text-center mb-8">
              <Lightbulb className="mx-auto h-12 w-12 text-blue-400 mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Submit Your Idea</h2>
              <p className="text-blue-200">
                Describe your topic and what you want to achieve. You'll get refined suggestions.
              </p>
            </div>

            <form onSubmit={handleIdeaSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Idea Title</label>
                  <Input
                    value={ideaForm.title}
                    onChange={(e) => setIdeaForm({...ideaForm, title: e.target.value})}
                    placeholder="e.g., Short video about eco-friendly travel"
                    className="bg-blue-900/50 border-blue-400/30 text-white placeholder:text-blue-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <Select value={ideaForm.category} onValueChange={(value) => setIdeaForm({...ideaForm, category: value})}>
                    <SelectTrigger className="bg-blue-900/50 border-blue-400/30 text-white">
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Details</label>
                <Textarea
                  value={ideaForm.details}
                  onChange={(e) => setIdeaForm({...ideaForm, details: e.target.value})}
                  placeholder="Add target audience, tone, platform, duration, constraints..."
                  className="bg-blue-900/50 border-blue-400/30 text-white placeholder:text-blue-300 min-h-32"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white px-8">
                  Get Suggestions
                </Button>
              </div>
            </form>

            {showIdeaResult && (
              <div className="mt-8 p-6 bg-blue-900/60 border border-blue-400/30 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Suggestions</h3>
                <div 
                  className="text-blue-100 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: ideaResult }}
                />
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Analyze Section */}
      <section id="analyze" className="relative z-10 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="backdrop-blur-md bg-blue-900/40 border-blue-400/30 p-8">
            <div className="text-center mb-8">
              <BarChart3 className="mx-auto h-12 w-12 text-blue-400 mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Analyze Media</h2>
              <p className="text-blue-200">
                Upload an image, video, or audio clip. You'll get insights and content ideas.
              </p>
            </div>

            <div className="border-2 border-dashed border-blue-400/30 rounded-lg p-12 text-center hover:border-blue-400/50 transition-colors cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-blue-400 mb-4" />
              <p className="text-white text-lg mb-2">Drag & drop media here</p>
              <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                Browse Files
              </Button>
              <p className="text-blue-300 text-sm mt-4">
                Supported: JPG/PNG • MP4/MOV • MP3/WAV
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-blue-400/20">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-blue-200">
            © {new Date().getFullYear()} MediaLens · Stay connected
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-200 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
