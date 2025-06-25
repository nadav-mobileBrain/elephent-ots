import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Alert } from 'react-native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { shuffle } from '@/utils/helpers';
import Colors from '@/constants/Colors';
import Card from '@/components/Card';
import Button from '@/components/Button';

// Memory game items
const items = [
  { id: 1, name: 'Waterhole', emoji: '💧' },
  { id: 2, name: 'Tree', emoji: '🌳' },
  { id: 3, name: 'Mountain', emoji: '⛰️' },
  { id: 4, name: 'Elephant', emoji: '🐘' },
  { id: 5, name: 'Grass', emoji: '🌿' },
  { id: 6, name: 'Sun', emoji: '☀️' },
  { id: 7, name: 'Moon', emoji: '🌙' },
  { id: 8, name: 'Star', emoji: '⭐' },
];

interface GameItem {
  id: number;
  value: typeof items[number];
  flipped: boolean;
  matched: boolean;
}

export default function MemoryScreen() {
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const scoreAnimation = useSharedValue(1);
  
  // Setup game board
  const setupGame = () => {
    setLoading(true);
    // Create a pair of each item
    const allItems = [...items, ...items]
      .map((item, index) => ({
        id: index,
        value: item,
        flipped: false,
        matched: false,
      }));
    
    // Shuffle items
    const shuffledItems = shuffle(allItems);
    
    // Reset game state
    setGameItems(shuffledItems);
    setSelectedItems([]);
    setMoves(0);
    setMatches(0);
    setGameOver(false);
    setGameStarted(true);
    setLoading(false);
  };
  
  // Handle card flip
  const handleFlip = (id: number) => {
    if (selectedItems.length === 2 || 
        selectedItems.includes(id) || 
        gameItems[id].matched ||
        !gameStarted || 
        gameOver) {
      return;
    }
    
    // Flip the card
    const updatedItems = [...gameItems];
    updatedItems[id].flipped = true;
    setGameItems(updatedItems);
    
    // Add to selection
    const newSelectedItems = [...selectedItems, id];
    setSelectedItems(newSelectedItems);
    
    // If two cards are selected, check for match
    if (newSelectedItems.length === 2) {
      setMoves(prev => prev + 1);
      
      // Check for match after a short delay
      setTimeout(() => {
        const [first, second] = newSelectedItems;
        const match = updatedItems[first].value.id === updatedItems[second].value.id;
        
        if (match) {
          // Mark as matched
          updatedItems[first].matched = true;
          updatedItems[second].matched = true;
          const newMatches = matches + 1;
          setMatches(newMatches);
          
          // Animate score
          scoreAnimation.value = withSpring(1.2);
          setTimeout(() => {
            scoreAnimation.value = withSpring(1);
          }, 200);
          
          // Check if game is over
          if (newMatches === items.length) {
            setGameOver(true);
            setTimeout(() => {
              Alert.alert(
                "Congratulations!",
                `You completed the game in ${moves + 1} moves!`,
                [{ text: "Play Again", onPress: setupGame }]
              );
            }, 500);
          }
        } else {
          // If no match, flip back
          updatedItems[first].flipped = false;
          updatedItems[second].flipped = false;
        }
        
        setGameItems(updatedItems);
        setSelectedItems([]);
      }, 1000);
    }
  };
  
  // Animated style for score
  const scoreStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scoreAnimation.value }],
    };
  });
  
  // Calculate grid columns based on screen width
  const screenWidth = Dimensions.get('window').width;
  const gridColumns = screenWidth > 500 ? 4 : 3;
  const cardSize = (screenWidth - 64) / gridColumns;
  
  return (
    <View style={styles.container}>
      <Card style={styles.scoreCard}>
        <View style={styles.scoreRow}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Moves</Text>
            <Text style={styles.scoreValue}>{moves}</Text>
          </View>
          <Animated.View style={[styles.scoreItem, scoreStyle]}>
            <Text style={styles.scoreLabel}>Matches</Text>
            <Text style={[styles.scoreValue, styles.matchesValue]}>{matches}/{items.length}</Text>
          </Animated.View>
        </View>
      </Card>
      
      {!gameStarted ? (
        <View style={styles.startContainer}>
          <Text style={styles.gameTitle}>Elephant Memory Game</Text>
          <Text style={styles.gameDescription}>
            Test your memory by matching pairs of elephant journey items. Find all matches with the fewest moves!
          </Text>
          <Button 
            onPress={setupGame}
            title="Start Game"
            loading={loading}
            style={styles.startButton}
          />
        </View>
      ) : (
        <View style={[styles.gameGrid, { width: cardSize * gridColumns + (gridColumns - 1) * 8 }]}>
          {gameItems.map((item, index) => (
            <Animated.View 
              key={index}
              entering={FadeIn.delay(index * 50).duration(300)}
              exiting={FadeOut.duration(300)}
              style={[
                styles.card, 
                { width: cardSize - 8, height: cardSize - 8 }
              ]}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.cardInner,
                  item.flipped && styles.cardFlipped,
                  item.matched && styles.cardMatched,
                  pressed && styles.cardPressed
                ]}
                onPress={() => handleFlip(index)}
                disabled={item.flipped || item.matched}
              >
                {item.flipped || item.matched ? (
                  <View style={styles.cardFront}>
                    <Text style={styles.cardEmoji}>{item.value.emoji}</Text>
                    <Text style={styles.cardName}>{item.value.name}</Text>
                  </View>
                ) : (
                  <View style={styles.cardBack}>
                    <Text style={styles.cardBackText}>?</Text>
                  </View>
                )}
              </Pressable>
            </Animated.View>
          ))}
        </View>
      )}
      
      {gameStarted && !gameOver && (
        <View style={styles.buttonContainer}>
          <Button 
            onPress={setupGame} 
            title="Restart Game"
            variant="secondary"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100,
    backgroundColor: Colors.background,
  },
  scoreCard: {
    marginBottom: 20,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  scoreItem: {
    alignItems: 'center',
    minWidth: 100,
  },
  scoreLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  matchesValue: {
    color: Colors.primary,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  gameDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  startButton: {
    minWidth: 200,
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    margin: 4,
    borderRadius: 8,
  },
  cardInner: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardFlipped: {
    backgroundColor: Colors.card,
  },
  cardMatched: {
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  cardFront: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  cardName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  cardBack: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});