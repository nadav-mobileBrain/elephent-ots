import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { Info, Heart, Leaf, Award, ChevronDown, ChevronUp, Globe as Globe2, Users, TriangleAlert as AlertTriangle, Stethoscope, Eye, Car, Baby } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Card from '@/components/Card';

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  image?: string;
  isEmergency?: boolean;
}

export default function GuideScreen() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (id: string) => {
    if (expandedSection === id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(id);
    }
  };
  
  const emergencyGuideSections: GuideSection[] = [
    {
      id: 'poachers',
      title: 'Encountering Poachers',
      icon: <AlertTriangle size={24} color={Colors.primary} />,
      content: `IMPORTANT: Your safety is the top priority. Do not confront poachers directly.

Warning Signs to Watch For:
• Unusual vehicle activity in protected areas
• Gunshots or unusual sounds
• Snares, traps, or disturbed ground
• Suspicious camps or equipment
• Aircraft flying unusually low

Immediate Actions:
1. Stay Hidden & Safe
   • Maintain distance
   • Find cover if possible
   • Stay quiet and still
   • Do not use flash photography

2. Document (if safe):
   • Location (GPS coordinates if possible)
   • Time and date
   • Number of people
   • Vehicle descriptions
   • Equipment observed
   • Take photos only if completely safe

3. Report to Authorities:
   • Local wildlife authorities
   • Park rangers
   • Police
   • Anti-poaching hotlines

Emergency Contacts:
• International Wildlife Crime Hotline: +1-844-FWS-TIPS
• TRAFFIC Wildlife Trade Monitoring: www.traffic.org
• Local Park Authority (save number before visiting)

Remember:
• Never confront poachers - they may be armed
• Your safety comes first
• Evidence is valuable but not worth risking your life
• Report even if unsure - let authorities investigate`,
      isEmergency: true,
      image: 'https://images.pexels.com/photos/133394/pexels-photo-133394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'injured',
      title: 'Sick or Injured Elephant',
      icon: <Stethoscope size={24} color={Colors.primary} />,
      content: `If you encounter a sick or injured elephant, follow these guidelines:

Signs of Distress:
• Limping or difficulty moving
• Visible wounds or bleeding
• Unusual posture or behavior
• Separation from the herd
• Lethargy or weakness
• Signs of pain or discomfort

DO NOT:
• Approach the elephant
• Try to treat it yourself
• Feed or give water
• Separate it from its herd
• Make loud noises

Safe Observation:
1. Keep Distance
   • Minimum 50 meters away
   • Use binoculars if available
   • Stay downwind
   • Have escape route ready

2. Document:
   • Take photos/videos from safe distance
   • Note exact location
   • Record behavior
   • Track time of observation
   • Count nearby elephants

3. Contact Authorities:
   • Local wildlife veterinarians
   • Park rangers
   • Wildlife sanctuaries
   • Conservation organizations

Key Information to Report:
• Location (be as specific as possible)
• Observed symptoms
• How long you've been observing
• Size of elephant
• Presence of other elephants
• Any immediate dangers

Emergency Resources:
• Save the Elephants: www.savetheelephants.org
• Local Wildlife Veterinary Services
• National Park Emergency Numbers`,
      isEmergency: true,
      image: 'https://images.pexels.com/photos/4551995/pexels-photo-4551995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'wild',
      title: 'Finding an Elephant in the Wild',
      icon: <Eye size={24} color={Colors.primary} />,
      content: `Encountering wild elephants requires calm, respectful behavior:

Immediate Actions:
1. Stay Calm
   • Don't panic or run
   • Speak quietly if necessary
   • Move slowly and deliberately
   • Keep your group together

2. Maintain Safe Distance
   • At least 50 meters minimum
   • Further for mothers with calves
   • Have escape route ready
   • Stay downwind if possible

3. Read Body Language
   • Ears spread wide = warning
   • Trunk raised = investigating
   • Head held high = asserting dominance
   • Foot scraping = possible charge

DO NOT:
• Make sudden movements
• Use flash photography
• Make loud noises
• Block their path
• Approach or follow
• Feed the elephants
• Try to touch them

If Charged:
• Stand your ground for mock charges
• Look for escape routes
• Back away slowly if possible
• Get behind large objects
• Drop non-essential items

Recording the Encounter:
• Use zoom lens for photos
• Note location and time
• Document behavior
• Count group size
• Observe without disturbing

When to Leave:
• If elephants show signs of stress
• When asked by authorities
• If you feel unsafe
• Before dark
• During extreme weather

Report Sighting:
• Local wildlife authorities
• Research organizations
• Park rangers
• Conservation groups`,
      isEmergency: true,
      image: 'https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'road',
      title: 'Elephants Blocking Roads',
      icon: <Car size={24} color={Colors.primary} />,
      content: `When elephants are blocking your route, follow these safety guidelines:

Immediate Actions:
1. Stop Your Vehicle
   • Maintain safe distance (50+ meters)
   • Turn off engine
   • Stay inside vehicle
   • Turn off music/radio
   • Keep lights off unless necessary

2. Assess the Situation
   • Count number of elephants
   • Look for calves (extra caution needed)
   • Watch their behavior
   • Check for alternate routes
   • Note wind direction

DO NOT:
• Honk horn
• Rev engine
• Flash lights
• Try to drive around them
• Get out of vehicle
• Take flash photos
• Throw anything

Wait Patiently:
• Elephants have right of way
• They usually move in 10-15 minutes
• Use time to observe safely
• Keep engine off
• Stay quiet

When to Seek Help:
• If elephants show aggression
• If they stay longer than 30 minutes
• If you see injured animals
• If you feel unsafe

If You Must Turn Around:
• Wait for safe opportunity
• Turn slowly and quietly
• Maintain observation
• Don't accelerate rapidly

Emergency Contacts:
• Local wildlife authority
• Park rangers
• Police
• Road service

Remember:
• Your safety comes first
• Patience is essential
• Never force passage
• Report aggressive behavior`,
      isEmergency: true,
      image: 'https://images.pexels.com/photos/11318586/pexels-photo-11318586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'baby',
      title: 'Baby Elephant Alone',
      icon: <Baby size={24} color={Colors.primary} />,
      content: `Finding a baby elephant alone requires careful assessment and proper action:

Initial Assessment:
1. Observe Carefully
   • Look for nearby adult elephants
   • Listen for elephant calls
   • Check for signs of injury
   • Note exact location
   • Monitor time alone

DO NOT:
• Approach the baby
• Try to feed it
• Make contact
• Move it
• Make loud noises
• Block potential paths to herd

Signs It Needs Help:
• Alone for more than 2 hours
• Shows signs of distress
• Appears injured or weak
• Making distress calls
• Wandering aimlessly
• In dangerous location

When to Act:
• After 2+ hours of observation
• If immediate danger present
• When authorized by experts
• If clearly orphaned/abandoned

Who to Contact:
• Local wildlife authorities
• Elephant sanctuaries
• Park rangers
• Wildlife veterinarians
• Conservation organizations

Information to Report:
• Exact location
• Time first spotted
• Behavior observed
• Physical condition
• Surrounding hazards
• Weather conditions

While Waiting for Help:
• Keep monitoring from distance
• Document observations
• Prevent others approaching
• Stay quiet and still
• Watch for returning herd

Remember:
• Mother may be feeding nearby
• Herds sometimes leave babies briefly
• False abandonment is common
• Expert assessment is crucial
• Your presence may deter the herd's return`,
      isEmergency: true,
      image: 'https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  
  const guideSections: GuideSection[] = [
    {
      id: 'species',
      title: 'Elephant Species & Locations',
      icon: <Globe2 size={24} color={Colors.primary} />,
      content: `There are three living species of elephants, each with unique characteristics and habitats:

1. African Bush (Savanna) Elephant
   • Largest living land animal
   • Location: Sub-Saharan Africa
   • Habitat: Savannas, woodlands, forests
   • Distinctive Features:
     - Larger ears (shaped like Africa)
     - Longer tusks
     - Both males and females have tusks
   • Population: Approximately 415,000

2. African Forest Elephant
   • Recently recognized as distinct species
   • Location: Central and West African rainforests
   • Habitat: Dense forests
   • Distinctive Features:
     - Smaller and darker than bush elephants
     - More oval-shaped ears
     - Straighter tusks
   • Population: Less than 150,000

3. Asian Elephant
   • Location: 13 countries across South and Southeast Asia
   • Habitat: Various forest types
   • Distinctive Features:
     - Smaller ears (shaped like India)
     - Smaller overall size
     - Only males typically have tusks
     - More rounded back
   • Population: Approximately 45,000

Key Regional Populations:
• Eastern Africa: Kenya, Tanzania, Uganda
• Southern Africa: Botswana, Zimbabwe, South Africa
• Southeast Asia: Thailand, Sri Lanka, India
• Island Populations: Borneo, Sumatra`,
      image: 'https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'volunteer',
      title: 'Global Volunteer Programs',
      icon: <Users size={24} color={Colors.primary} />,
      content: `Discover meaningful ways to contribute to elephant conservation through these verified volunteer programs:

1. Thailand Programs
   • Elephant Nature Park (Chiang Mai)
     - Focus: Rehabilitation and sanctuary care
     - Duration: 1-4 weeks
     - Activities: Food preparation, habitat maintenance
     - Requirements: 18+ years, good physical fitness
   
   • Wildlife Friends Foundation
     - Focus: Rescue and rehabilitation
     - Duration: 2-12 weeks
     - Activities: Enrichment, observation, maintenance
     - Special feature: Veterinary program available

2. African Opportunities
   • Elephant Havens (Botswana)
     - Focus: Orphan care and protection
     - Duration: 2-8 weeks
     - Activities: Monitoring, research, community education
   
   • Sheldrick Wildlife Trust (Kenya)
     - Focus: Orphan elephant rescue and rehabilitation
     - Duration: Various programs
     - Activities: Support keeper activities, research
   
   • Game Rangers International (Zambia)
     - Focus: Anti-poaching and community conservation
     - Duration: 1-3 months
     - Activities: Research, community work, monitoring

3. Asian Programs
   • Wildlife SOS (India)
     - Focus: Rescued elephant care
     - Duration: 2-12 weeks
     - Activities: Healthcare, enrichment, education
   
   • Elephant Conservation Center (Laos)
     - Focus: Natural habitat conservation
     - Duration: 1-3 months
     - Activities: Observation, research, local community work

Preparation Tips:
• Get travel insurance covering volunteer work
• Update vaccinations
• Research local customs and culture
• Basic language skills are helpful
• Bring appropriate clothing for climate

Application Process:
1. Research and choose program
2. Submit application (3-6 months ahead)
3. Complete health checks
4. Arrange travel and accommodation
5. Complete required training

Remember: Always verify organizations prioritize elephant welfare over tourism revenue.`,
      image: 'https://images.pexels.com/photos/4551995/pexels-photo-4551995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'keeper',
      title: 'How to Become an Elephant Keeper',
      icon: <Award size={24} color={Colors.primary} />,
      content: `Becoming an elephant keeper requires dedication, education, and hands-on experience. Here's what you need to know:

1. Education Requirements:
   • Bachelor's degree in zoology, wildlife management, or animal science
   • Coursework in animal behavior, biology, and conservation
   • First aid and safety training

2. Experience Needed:
   • Volunteer work at wildlife sanctuaries or zoos
   • Internships with experienced elephant handlers
   • Experience with large animals (horses, livestock)

3. Essential Skills:
   • Understanding elephant behavior and body language
   • Physical fitness and strength
   • Patience and calmness under pressure
   • Observation skills
   • Record-keeping abilities

4. Career Path:
   • Start as a volunteer or intern
   • Progress to assistant keeper
   • Advance to full keeper with specialized training
   • Potential to become head keeper or conservation specialist

Most elephant keepers describe their job as challenging but incredibly rewarding. The bond formed with these intelligent animals makes all the hard work worthwhile.`,
      image: 'https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'conservation',
      title: 'Conservation Awareness',
      icon: <Leaf size={24} color={Colors.primary} />,
      content: `Elephants face serious threats in the wild. Here's what's happening and how you can help:

Current Threats:
• Poaching for ivory continues despite bans
• Habitat loss due to agriculture and development
• Human-elephant conflict in populated areas
• Climate change affecting migration patterns

Conservation Efforts:
• Anti-poaching patrols and technology
• Habitat protection and corridor creation
• Community education and incentive programs
• Research to understand elephant needs

How You Can Help:
• Support reputable conservation organizations
• Choose ethical tourism that doesn't exploit elephants
• Avoid products made from ivory or elephant parts
• Spread awareness about elephant conservation
• Participate in "adopt an elephant" programs
• Reduce consumption that contributes to habitat loss

Every action makes a difference in protecting these magnificent animals for future generations.`,
      image: 'https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View
        entering={FadeInDown.duration(800).springify()}
        style={styles.header}
      >
        <Text style={styles.title}>Wildlife Guide</Text>
        <Text style={styles.subtitle}>
          Learn about elephants and how to protect them
        </Text>
      </Animated.View>

      <Text style={styles.sectionTitle}>Emergency Guide</Text>
      {emergencyGuideSections.map((section, index) => (
        <Animated.View
          key={section.id}
          entering={SlideInRight.delay(index * 100).duration(400).springify()}
        >
          <Card style={[styles.sectionCard, styles.emergencyCard]}>
            <Pressable 
              onPress={() => toggleSection(section.id)}
              style={styles.sectionHeader}
            >
              {section.icon}
              <Text style={[styles.sectionTitle, styles.emergencyTitle]}>{section.title}</Text>
              {expandedSection === section.id ? (
                <ChevronUp size={20} color={Colors.textSecondary} />
              ) : (
                <ChevronDown size={20} color={Colors.textSecondary} />
              )}
            </Pressable>
            
            {expandedSection === section.id && (
              <Animated.View
                entering={FadeIn.duration(300)}
                style={styles.sectionContent}
              >
                {section.image && (
                  <Image
                    source={{ uri: section.image }}
                    style={styles.sectionImage}
                  />
                )}
                <Text style={styles.sectionText}>{section.content}</Text>
              </Animated.View>
            )}
          </Card>
        </Animated.View>
      ))}
      
      <Text style={styles.sectionTitle}>General Information</Text>
      {guideSections.map((section, index) => (
        <Animated.View
          key={section.id}
          entering={SlideInRight.delay(index * 100).duration(400).springify()}
        >
          <Card style={styles.sectionCard}>
            <Pressable 
              onPress={() => toggleSection(section.id)}
              style={styles.sectionHeader}
            >
              {section.icon}
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {expandedSection === section.id ? (
                <ChevronUp size={20} color={Colors.textSecondary} />
              ) : (
                <ChevronDown size={20} color={Colors.textSecondary} />
              )}
            </Pressable>
            
            {expandedSection === section.id && (
              <Animated.View
                entering={FadeIn.duration(300)}
                style={styles.sectionContent}
              >
                {section.image && (
                  <Image
                    source={{ uri: section.image }}
                    style={styles.sectionImage}
                  />
                )}
                <Text style={styles.sectionText}>{section.content}</Text>
              </Animated.View>
            )}
          </Card>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingTop: 100,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  sectionCard: {
    marginBottom: 16,
  },
  emergencyCard: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  emergencyTitle: {
    color: Colors.primary,
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
  },
});