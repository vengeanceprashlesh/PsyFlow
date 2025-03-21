/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Pencil, Trash, Calendar, Clock, Check, Tag, Search, Bookmark, MoreHorizontal, Image, Smile, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AnimatedTransition from '@/components/shared/AnimatedTransition';

interface JournalEntryData {
  id: string;
  title: string;
  content: string;
  date: Date;
  emotions: string[];
  tags: string[];
  isFavorite: boolean;
  location?: string;
  imageUrl?: string;
  mood?: number; // 1-5 scale
}

const emotionOptions = [
  'Happy', 'Sad', 'Anxious', 'Calm', 'Frustrated',
  'Excited', 'Tired', 'Grateful', 'Overwhelmed', 'Hopeful',
  'Content', 'Inspired', 'Stressed', 'Peaceful', 'Energetic'
];

const tagSuggestions = [
  'Work', 'Family', 'Health', 'Personal Growth', 'Relationships',
  'Goals', 'Travel', 'Learning', 'Challenge', 'Success',
  'Setback', 'Self-care', 'Hobby', 'Spirituality', 'Creativity'
];

const JournalEntry: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntryData[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'title' | 'content' | 'tags' | 'emotions'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [activeEntry, setActiveEntry] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [isFavorite, setIsFavorite] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'favorites'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    // Load entries from localStorage on component mount
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      // Convert stored date strings back to Date objects
      const entriesWithDates = parsed.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      setEntries(entriesWithDates);
    }
  }, []);

  useEffect(() => {
    // Save entries to localStorage whenever they change
    if (entries.length > 0) {
      localStorage.setItem('journalEntries', JSON.stringify(entries));
    }
  }, [entries]);

  const handleSaveEntry = () => {
    if (!title.trim() || !content.trim()) return;
    
    if (activeEntry) {
      // Edit existing entry
      const updatedEntries = entries.map(entry => 
        entry.id === activeEntry 
          ? {
              ...entry,
              title: title.trim(),
              content: content.trim(),
              emotions: selectedEmotions,
              tags: currentTags,
              isFavorite,
              mood: currentMood,
              location: locationInput || entry.location
            }
          : entry
      );
      setEntries(updatedEntries);
    } else {
      // Create new entry
    const newEntry: JournalEntryData = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      date: new Date(),
        emotions: selectedEmotions,
        tags: currentTags,
        isFavorite,
        location: locationInput || undefined,
        mood: currentMood
    };
    
    setEntries([newEntry, ...entries]);
    }
    
    setShowSuccess(true);
    
    // Reset form
    setTimeout(() => {
      resetForm();
    }, 1500);
  };
  
  const resetForm = () => {
      setTitle('');
      setContent('');
      setSelectedEmotions([]);
    setCurrentTags([]);
    setTagInput('');
    setIsFavorite(false);
    setCurrentMood(3);
    setLocationInput('');
    setActiveEntry(null);
    setIsEditing(false);
      setShowSuccess(false);
  };
  
  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
      setCurrentTags([...currentTags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setCurrentTags(currentTags.filter(tag => tag !== tagToRemove));
  };
  
  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry? This action cannot be undone.')) {
    setEntries(entries.filter(entry => entry.id !== id));
    }
  };
  
  const handleEditEntry = (entry: JournalEntryData) => {
    setTitle(entry.title);
    setContent(entry.content);
    setSelectedEmotions(entry.emotions);
    setCurrentTags(entry.tags || []);
    setIsFavorite(entry.isFavorite || false);
    setCurrentMood(entry.mood || 3);
    setLocationInput(entry.location || '');
    setIsEditing(true);
    setActiveEntry(entry.id);
  };

  const toggleFavorite = (entryId: string) => {
    setEntries(entries.map(entry => 
      entry.id === entryId 
        ? { ...entry, isFavorite: !entry.isFavorite }
        : entry
    ));
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFilteredEntries = () => {
    let filtered = entries;
    
    // Filter by favorites if needed
    if (viewMode === 'favorites') {
      filtered = filtered.filter(entry => entry.isFavorite);
    }
    
    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(entry => {
        if (searchFilter === 'all') {
          return (
            entry.title.toLowerCase().includes(query) ||
            entry.content.toLowerCase().includes(query) ||
            entry.tags?.some(tag => tag.toLowerCase().includes(query)) ||
            entry.emotions.some(emotion => emotion.toLowerCase().includes(query))
          );
        } else if (searchFilter === 'title') {
          return entry.title.toLowerCase().includes(query);
        } else if (searchFilter === 'content') {
          return entry.content.toLowerCase().includes(query);
        } else if (searchFilter === 'tags') {
          return entry.tags?.some(tag => tag.toLowerCase().includes(query));
        } else if (searchFilter === 'emotions') {
          return entry.emotions.some(emotion => emotion.toLowerCase().includes(query));
        }
        return true;
      });
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  };

  const filteredEntries = getFilteredEntries();
  
  const getMoodEmoji = (mood: number = 3) => {
    const emojis = ["😔", "😕", "😐", "🙂", "😊"];
    return emojis[Math.min(Math.max(0, mood - 1), 4)];
  };

  return (
    <div className="flex flex-col space-y-6">
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <AnimatedTransition variant="scale" key="success">
            <Card className="p-5 border-accent/20 shadow-md">
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-5 shadow-inner">
                  <Check className="h-10 w-10 text-accent" />
                </div>
                <h4 className="heading-sm text-accent mb-2">Entry Saved!</h4>
                <p className="paragraph text-center max-w-md">
                  Your journal entry has been successfully saved.
                </p>
              </div>
            </Card>
          </AnimatedTransition>
        ) : isEditing ? (
          <AnimatedTransition key="form" variant="fadeIn">
            <Card className="p-6 border-accent/20 shadow-md">
              <h3 className="heading-sm text-primary mb-6">{activeEntry ? 'Edit Journal Entry' : 'New Journal Entry'}</h3>
              
              <div className="space-y-5">
                <div>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your entry a title..."
                    className="focus-ring text-lg font-medium py-6"
                  />
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{formatDate(new Date())}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{formatTime(new Date())}</span>
                  </div>
                </div>
                
                <div>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your thoughts, feelings, and reflections here..."
                    className="min-h-[250px] resize-none focus-ring text-base leading-relaxed"
                  />
                </div>
                
                <Tabs defaultValue="emotions" className="w-full">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="emotions">
                      <div className="flex items-center space-x-2">
                        <Smile size={16} />
                        <span>Emotions</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="tags">
                      <div className="flex items-center space-x-2">
                        <Tag size={16} />
                        <span>Tags</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="mood">
                      <div className="flex items-center space-x-2">
                        <Activity size={16} />
                        <span>Mood</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="meta">
                      <div className="flex items-center space-x-2">
                        <Image size={16} />
                        <span>Details</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="emotions" className="pt-4 pb-2">
                    <p className="paragraph text-sm mb-3">How are you feeling? (Select all that apply)</p>
                  <div className="flex flex-wrap gap-2">
                    {emotionOptions.map((emotion) => (
                      <button
                        key={emotion}
                        onClick={() => toggleEmotion(emotion)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          selectedEmotions.includes(emotion)
                            ? 'bg-primary text-white'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                      >
                        {emotion}
                      </button>
                    ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tags" className="pt-4 pb-2">
                    <p className="paragraph text-sm mb-3">Add tags to help organize your entries</p>
                    <div className="flex items-center mb-3">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag..."
                        className="focus-ring"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button 
                        onClick={handleAddTag}
                        className="ml-2 bg-accent"
                        disabled={!tagInput.trim() || currentTags.includes(tagInput.trim())}
                      >
                        Add
                      </Button>
                    </div>
                    
                    {currentTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {currentTags.map((tag) => (
                          <div key={tag} className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm flex items-center">
                            {tag}
                            <button 
                              onClick={() => removeTag(tag)}
                              className="ml-2 rounded-full hover:bg-accent/10 p-1"
                            >
                              <Trash size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Suggested tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {tagSuggestions
                          .filter(tag => !currentTags.includes(tag))
                          .slice(0, 6)
                          .map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setCurrentTags([...currentTags, tag])}
                              className="px-3 py-1 rounded-full text-xs bg-secondary/60 hover:bg-secondary"
                            >
                              {tag}
                            </button>
                          ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mood" className="pt-4 pb-2">
                    <p className="paragraph text-sm mb-2">How's your overall mood today?</p>
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="text-4xl mb-4">{getMoodEmoji(currentMood)}</div>
                      <div className="w-full max-w-md flex items-center justify-between px-2">
                        <span className="text-xs text-muted-foreground">Low</span>
                        <span className="text-xs text-muted-foreground">High</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={currentMood}
                        onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                        className="w-full max-w-md mt-2"
                      />
                      <div className="flex justify-between w-full max-w-md mt-2">
                        <span className="text-xs text-muted-foreground">😔</span>
                        <span className="text-xs text-muted-foreground">😕</span>
                        <span className="text-xs text-muted-foreground">😐</span>
                        <span className="text-xs text-muted-foreground">🙂</span>
                        <span className="text-xs text-muted-foreground">😊</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="meta" className="pt-4 pb-2">
                    <div className="space-y-4">
                      <div>
                        <p className="paragraph text-sm mb-2">Location (optional)</p>
                        <Input
                          value={locationInput}
                          onChange={(e) => setLocationInput(e.target.value)}
                          placeholder="Where are you?"
                          className="focus-ring"
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="favorite"
                          checked={isFavorite}
                          onChange={() => setIsFavorite(!isFavorite)}
                          className="mr-2"
                        />
                        <label htmlFor="favorite" className="text-sm cursor-pointer">
                          Mark as favorite
                        </label>
                  </div>
                </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="px-6 border-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveEntry}
                    disabled={!title.trim() || !content.trim()}
                    className="px-6 bg-accent hover:bg-accent/90"
                  >
                    <Save size={16} className="mr-2" />
                    Save Entry
                  </Button>
                </div>
              </div>
            </Card>
          </AnimatedTransition>
        ) : (
          <AnimatedTransition key="entryList" variant="fadeIn">
            <Card className="p-6 border-accent/20 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <h3 className="heading-sm text-primary mr-2">Your Journal</h3>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                    {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                  </span>
                </div>
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-accent hover:bg-accent/90"
                >
                  New Entry
                </Button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search your journal entries..."
                      className="pl-10 focus-ring"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowFilters(!showFilters)}
                    className={showFilters ? 'bg-secondary' : ''}
                  >
                    <Activity size={16} />
                  </Button>
                </div>
                
                {showFilters && (
                  <div className="p-4 rounded-md bg-secondary/20 mb-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <label className="text-sm font-medium mr-2">Search in:</label>
                        <select 
                          value={searchFilter}
                          onChange={(e) => setSearchFilter(e.target.value as "all" | "title" | "content" | "tags" | "emotions")}
                          className="text-sm bg-background border rounded-md px-2 py-1"
                        >
                          <option value="all">All fields</option>
                          <option value="title">Title only</option>
                          <option value="content">Content only</option>
                          <option value="tags">Tags only</option>
                          <option value="emotions">Emotions only</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center">
                        <label className="text-sm font-medium mr-2">View:</label>
                        <select 
                          value={viewMode}
                          onChange={(e) => setViewMode(e.target.value as any)}
                          className="text-sm bg-background border rounded-md px-2 py-1"
                        >
                          <option value="all">All entries</option>
                          <option value="favorites">Favorites only</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center">
                        <label className="text-sm font-medium mr-2">Sort:</label>
                        <select 
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value as any)}
                          className="text-sm bg-background border rounded-md px-2 py-1"
                        >
                          <option value="newest">Newest first</option>
                          <option value="oldest">Oldest first</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {filteredEntries.length === 0 ? (
                searchQuery ? (
                  <div className="text-center py-10">
                    <p className="paragraph mb-4">No entries match your search criteria.</p>
                    <Button variant="outline" onClick={() => setSearchQuery('')}>
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="paragraph mb-4">You haven't created any journal entries yet.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 border-2"
                    >
                      Create Your First Entry
                    </Button>
                  </div>
                )
              ) : (
                <div className="space-y-5">
                  {filteredEntries.map((entry) => (
                    <AnimatedTransition key={entry.id} variant="slideUp" className="mb-4">
                      <Card className="p-5 border border-accent/10 hover:shadow-md transition-shadow bg-white/70 dark:bg-gray-800/70">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <h4 className="font-medium text-lg text-primary">{entry.title}</h4>
                            {entry.isFavorite && (
                              <Bookmark size={16} className="ml-2 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                            >
                                  <MoreHorizontal size={16} />
                            </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditEntry(entry)}>
                                  <Pencil size={14} className="mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleFavorite(entry.id)}>
                                  <Bookmark size={14} className="mr-2" />
                                  {entry.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteEntry(entry.id)} className="text-destructive">
                                  <Trash size={14} className="mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 mb-3">
                          <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            {formatDate(entry.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            {formatTime(entry.date)}
                          </div>
                          </div>
                          {entry.mood && (
                            <div className="text-base">
                              {getMoodEmoji(entry.mood)}
                            </div>
                          )}
                        </div>
                        
                        <p className="paragraph mt-3 line-clamp-3">{entry.content}</p>
                        
                        <div className="flex flex-wrap gap-y-3 mt-4">
                          {entry.location && (
                            <div className="flex items-center text-xs text-muted-foreground mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                <circle cx="12" cy="10" r="3"/>
                              </svg>
                              {entry.location}
                            </div>
                          )}
                          
                          <div className="flex-1"></div>
                        
                        {entry.emotions.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {entry.emotions.slice(0, 3).map((emotion) => (
                              <span 
                                key={emotion}
                                  className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                              >
                                {emotion}
                              </span>
                            ))}
                              {entry.emotions.length > 3 && (
                                <span className="px-2 py-0.5 bg-secondary rounded-full text-xs">
                                  +{entry.emotions.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                          
                          {entry.tags && entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 ml-2">
                              {entry.tags.slice(0, 2).map((tag) => (
                                <span 
                                  key={tag}
                                  className="px-2 py-0.5 bg-accent/10 text-accent rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                              {entry.tags.length > 2 && (
                                <span className="px-2 py-0.5 bg-secondary rounded-full text-xs">
                                  +{entry.tags.length - 2}
                                </span>
                              )}
                          </div>
                        )}
                        </div>
                      </Card>
                    </AnimatedTransition>
                  ))}
                </div>
              )}
              
              {filteredEntries.length > 5 && (
                <div className="flex justify-center mt-6">
                  <Button variant="outline" onClick={() => setIsEditing(true)} className="mt-4">
                    New Entry
                  </Button>
                </div>
              )}
            </Card>
          </AnimatedTransition>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JournalEntry;
