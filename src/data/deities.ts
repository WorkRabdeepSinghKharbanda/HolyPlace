export interface Verse {
  hi: string;
  en: string;
}

export interface Chant {
  title: string;
  hiTitle: string;
  verses: Verse[];
}

export interface Deity {
  id: string;
  name: string;
  sanskritName: string;
  epithet: string;
  color: string;
  mantra: {
    devanagari: string;
    transliteration: string;
    meaning: string;
  };
  aarti: Chant;
}

export const deities: Deity[] = [
  {
    id: "ganesha",
    name: "Ganesha",
    sanskritName: "गणेश",
    epithet: "Remover of Obstacles",
    color: "#e0752c",
    mantra: {
      devanagari: "ॐ गं गणपतये नमः",
      transliteration: "Om Gam Ganapataye Namah",
      meaning: "I bow to Ganapati, the lord who removes obstacles and grants success.",
    },
    aarti: {
      title: "Jai Ganesh Aarti",
      hiTitle: "जय गणेश आरती",
      verses: [
        {
          hi: "जय गणेश जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥",
          en: "Victory to Ganesha, victory to Ganesha, victory to Lord Ganesha.\nWhose mother is Parvati, whose father is Mahadeva (Shiva).",
        },
        {
          hi: "एक दन्त दयावन्त, चार भुजा धारी।\nमाथे पर तिलक सोहे, मूसे की सवारी॥",
          en: "One-tusked, full of compassion, bearing four arms.\nA sacred mark shines on his forehead, he rides upon a mouse.",
        },
        {
          hi: "पान चढ़े फूल चढ़े, और चढ़े मेवा।\nलड्डुअन का भोग लगे, संत करें सेवा॥",
          en: "Betel leaves are offered, flowers are offered, and dried fruits too.\nSweet laddus are offered, saints perform his service.",
        },
        {
          hi: "अंधन को आंख देत, कोढ़िन को काया।\nबांझन को पुत्र देत, निर्धन को माया॥",
          en: "He gives sight to the blind, a healthy body to the leper.\nHe grants sons to the childless, wealth to the poor.",
        },
        {
          hi: "सूर श्याम शरण आए, सुरति निहारो।\nमन बुद्धि सुधि दो, दीनन का पालनहारो॥",
          en: "Devotees come to your refuge, look upon them with grace.\nGrant clarity of mind and wisdom, O nurturer of the humble.",
        },
        {
          hi: "जय गणेश जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥",
          en: "Victory to Ganesha, victory to Ganesha, victory to Lord Ganesha.\nWhose mother is Parvati, whose father is Mahadeva (Shiva).",
        },
      ],
    },
  },
  {
    id: "shiva",
    name: "Shiva",
    sanskritName: "शिव",
    epithet: "The Auspicious One",
    color: "#4a7c99",
    mantra: {
      devanagari: "ॐ नमः शिवाय",
      transliteration: "Om Namah Shivaya",
      meaning: "I bow to Shiva, the auspicious one, the inner Self of all.",
    },
    aarti: {
      title: "Om Jai Shiv Omkara",
      hiTitle: "ॐ जय शिव ओंकारा",
      verses: [
        {
          hi: "ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।\nब्रह्मा विष्णु सदाशिव, अर्धांगी धारा॥",
          en: "Victory to Shiva, the primal sound Om.\nBrahma, Vishnu and Sadashiva share one form.",
        },
        {
          hi: "एकानन चतुरानन पंचानन राजे।\nहंसासन गरुड़ासन वृषवाहन साजे॥",
          en: "One-faced, four-faced, and five-faced you appear.\nSeated on a swan, on Garuda, adorned upon your bull.",
        },
        {
          hi: "दो भुज चार चतुर्भुज दस भुज अति सोहे।\nत्रिगुण रूप निरखते त्रिभुवन जन मोहे॥",
          en: "With two arms, four arms, or ten arms you shine.\nSeeing your three-natured form, all three worlds are enchanted.",
        },
        {
          hi: "अक्षमाला बनमाला मुण्डमाला धारी।\nत्रिपुरारी कंसारी कर माला धारी॥",
          en: "You wear a rosary, a garland of forest flowers, a garland of skulls.\nDestroyer of Tripura, holding a rosary in hand.",
        },
        {
          hi: "श्वेताम्बर पीताम्बर बाघम्बर अंगे।\nसनकादिक ब्रह्मादिक भूतादिक संगे॥",
          en: "Clad in white, in yellow, in tiger skin.\nAccompanied by sages, by Brahma, by all beings.",
        },
        {
          hi: "कर के मध्य कमण्डलु चक्र त्रिशूल धत्ता।\nजगकर्ता जगभर्ता जगपालनकर्ता॥",
          en: "Holding a water-pot, discus, and trident in hand.\nCreator, sustainer, and protector of the world.",
        },
        {
          hi: "ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।\nब्रह्मा विष्णु सदाशिव, अर्धांगी धारा॥",
          en: "Victory to Shiva, the primal sound Om.\nBrahma, Vishnu and Sadashiva share one form.",
        },
      ],
    },
  },
  {
    id: "vishnu",
    name: "Vishnu",
    sanskritName: "विष्णु",
    epithet: "The Preserver",
    color: "#2e6da4",
    mantra: {
      devanagari: "ॐ नमो नारायणाय",
      transliteration: "Om Namo Narayanaya",
      meaning: "I bow to Narayana, the eternal preserver and sustainer of the universe.",
    },
    aarti: {
      title: "Om Jai Jagdish Hare",
      hiTitle: "ॐ जय जगदीश हरे",
      verses: [
        {
          hi: "ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।\nभक्त जनों के संकट, क्षण में दूर करे॥",
          en: "Victory to the Lord of the universe, Hari.\nYou remove the troubles of your devotees in an instant.",
        },
        {
          hi: "जो ध्यावे फल पावे, दुःख बिनसे मन का।\nसुख सम्पत्ति घर आवे, कष्ट मिटे तन का॥",
          en: "Those who meditate on you gain their fruit, sorrow of the mind is destroyed.\nHappiness and prosperity enter the home, bodily suffering is removed.",
        },
        {
          hi: "मात पिता तुम मेरे, शरण गहूं मैं किसकी।\nतुम बिन और न दूजा, आस करूं मैं जिसकी॥",
          en: "You are my mother and father, in whom else could I take refuge?\nBesides you there is no other on whom I could rely.",
        },
        {
          hi: "तुम पूरण परमात्मा, तुम अंतर्यामी।\nपारब्रह्म परमेश्वर, तुम सबके स्वामी॥",
          en: "You are the complete Supreme Soul, the one who knows all hearts.\nThe Supreme Brahman, the Supreme Lord, you are the master of all.",
        },
        {
          hi: "तुम करुणा के सागर, तुम पालनकर्ता।\nमैं मूरख फलकामी, कृपा करो भर्ता॥",
          en: "You are an ocean of compassion, the sustainer of all.\nI am a foolish seeker of results, please show your grace, O Lord.",
        },
        {
          hi: "ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।\nभक्त जनों के संकट, क्षण में दूर करे॥",
          en: "Victory to the Lord of the universe, Hari.\nYou remove the troubles of your devotees in an instant.",
        },
      ],
    },
  },
  {
    id: "lakshmi",
    name: "Lakshmi",
    sanskritName: "लक्ष्मी",
    epithet: "Goddess of Wealth and Prosperity",
    color: "#c9962c",
    mantra: {
      devanagari: "ॐ श्रीं महालक्ष्म्यै नमः",
      transliteration: "Om Shreem Mahalakshmyai Namah",
      meaning: "I bow to Mahalakshmi, the goddess of abundance, prosperity, and grace.",
    },
    aarti: {
      title: "Om Jai Lakshmi Mata",
      hiTitle: "ॐ जय लक्ष्मी माता",
      verses: [
        {
          hi: "ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।\nतुमको निसदिन सेवत, हर विष्णु विधाता॥",
          en: "Victory to Mother Lakshmi.\nHari, Vishnu, and Brahma serve you day and night.",
        },
        {
          hi: "उमा रमा ब्रह्माणी, तुम ही जग माता।\nसूर्य चन्द्रमा ध्यावत, नारद ऋषि गाता॥",
          en: "You are Uma, Rama, Brahmani, mother of the world.\nThe sun and moon meditate on you, sage Narada sings your glory.",
        },
        {
          hi: "दुर्गा रूप निरंजनी, सुख सम्पत्ति दाता।\nजो कोई तुमको ध्यावत, ऋद्धि सिद्धि धन पाता॥",
          en: "In the pure form of Durga, you grant happiness and prosperity.\nWhoever meditates on you gains wealth, success and fulfillment.",
        },
        {
          hi: "तुम पाताल निवासिनि, तुम ही शुभदाता।\nकर्म प्रभाव प्रकाशिनि, भवनिधि की त्राता॥",
          en: "You dwell even in the netherworld, you are the giver of auspiciousness.\nYou reveal the fruits of our deeds, you save us from worldly bondage.",
        },
        {
          hi: "जिस घर में तुम रहती, सब सद्गुण आता।\nसब सम्भव हो जाता, मन नहीं घबराता॥",
          en: "The home where you reside gains all virtues.\nEverything becomes possible, the mind stays free of worry.",
        },
        {
          hi: "ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।\nतुमको निसदिन सेवत, हर विष्णु विधाता॥",
          en: "Victory to Mother Lakshmi.\nHari, Vishnu, and Brahma serve you day and night.",
        },
      ],
    },
  },
  {
    id: "durga",
    name: "Durga",
    sanskritName: "दुर्गा",
    epithet: "The Invincible Mother",
    color: "#a3273e",
    mantra: {
      devanagari: "ॐ दुं दुर्गायै नमः",
      transliteration: "Om Dum Durgayai Namah",
      meaning: "I bow to Durga, the fierce protecting mother who destroys all obstacles.",
    },
    aarti: {
      title: "Jai Ambe Gauri",
      hiTitle: "जय अम्बे गौरी",
      verses: [
        {
          hi: "जय अम्बे गौरी, मैया जय श्यामा गौरी।\nतुमको निशिदिन ध्यावत, हरि ब्रह्मा शिवरी॥",
          en: "Victory to Mother Amba, the fair and dark one.\nHari, Brahma, and Shiva meditate on you day and night.",
        },
        {
          hi: "मांग सिंदूर विराजत, टीको मृगमद को।\nउज्ज्वल से दो नैना, चंद्रवदन नीको॥",
          en: "Vermillion adorns your parting, musk marks your forehead.\nYour two eyes shine bright, your face glows like the moon.",
        },
        {
          hi: "कनक समान कलेवर, रक्ताम्बर राजे।\nरक्तपुष्प गल माला, कण्ठन पर साजे॥",
          en: "Your form is golden, clothed in red garments.\nA garland of red flowers adorns your neck.",
        },
        {
          hi: "केहरि वाहन राजत, खड्ग खप्पर धारी।\nसुर नर मुनि जन सेवत, तिनके दुःखहारी॥",
          en: "You ride a lion, bearing sword and bowl.\nGods, humans, and sages serve you, you remove their sorrows.",
        },
        {
          hi: "कानन कुण्डल शोभित, नासाग्रे मोती।\nकोटिक चन्द्र दिवाकर, राजत सम ज्योति॥",
          en: "Earrings shine in your ears, a pearl adorns your nose.\nYour radiance equals millions of moons and suns.",
        },
        {
          hi: "जय अम्बे गौरी, मैया जय श्यामा गौरी।\nतुमको निशिदिन ध्यावत, हरि ब्रह्मा शिवरी॥",
          en: "Victory to Mother Amba, the fair and dark one.\nHari, Brahma, and Shiva meditate on you day and night.",
        },
      ],
    },
  },
  {
    id: "saraswati",
    name: "Saraswati",
    sanskritName: "सरस्वती",
    epithet: "Goddess of Knowledge and Arts",
    color: "#5a8f7b",
    mantra: {
      devanagari: "ॐ ऐं सरस्वत्यै नमः",
      transliteration: "Om Aim Saraswatyai Namah",
      meaning: "I bow to Saraswati, the goddess of wisdom, speech, and the arts.",
    },
    aarti: {
      title: "Jai Saraswati Mata",
      hiTitle: "जय सरस्वती माता",
      verses: [
        {
          hi: "जय सरस्वती माता, मैया जय सरस्वती माता।\nसद्गुण वैभव शालिनी, त्रिभुवन विख्याता॥",
          en: "Victory to Mother Saraswati.\nAdorned with fine virtues, renowned in all three worlds.",
        },
        {
          hi: "चन्द्रवदनि पद्मासिनि, द्युति मंगलकारी।\nसोहे शुभ हंस सवारी, अतुल तेजधारी॥",
          en: "Moon-faced, seated on a lotus, your radiance brings auspiciousness.\nYou ride a graceful swan, bearing unmatched splendor.",
        },
        {
          hi: "बायें कर वीणा राजे, दायें कर माला।\nशीश मुकुट मणि सोहे, गल मोतियन माला॥",
          en: "In your left hand rests the veena, in your right a rosary.\nA jeweled crown shines on your head, a pearl necklace at your throat.",
        },
        {
          hi: "देवी सहाय करे जो, तुमरा यश गावे।\nदुःख दरिद्र निकट नहिं आवे, सुख सम्पत्ति पावे॥",
          en: "O Goddess, help those who sing your praise.\nSorrow and poverty stay far away, they attain happiness and prosperity.",
        },
        {
          hi: "जय सरस्वती माता, मैया जय सरस्वती माता।\nसद्गुण वैभव शालिनी, त्रिभुवन विख्याता॥",
          en: "Victory to Mother Saraswati.\nAdorned with fine virtues, renowned in all three worlds.",
        },
      ],
    },
  },
  {
    id: "hanuman",
    name: "Hanuman",
    sanskritName: "हनुमान",
    epithet: "The Devoted Protector",
    color: "#c14a2a",
    mantra: {
      devanagari: "ॐ हं हनुमते नमः",
      transliteration: "Om Han Hanumate Namah",
      meaning: "I bow to Hanuman, the mighty devotee whose strength and devotion protect all who call on him.",
    },
    aarti: {
      title: "Aarti Kije Hanuman Lala Ki",
      hiTitle: "आरती कीजै हनुमान लला की",
      verses: [
        {
          hi: "आरती कीजै हनुमान लला की।\nदुष्ट दलन रघुनाथ कला की॥",
          en: "Let us perform the aarti of dear child Hanuman.\nWho destroys the wicked by the power of Raghunath (Rama).",
        },
        {
          hi: "जाके बल से गिरिवर कांपे। रोग दोष जाके निकट न झांके॥",
          en: "By whose strength great mountains tremble. Disease and fault dare not come near him.",
        },
        {
          hi: "अंजनि पुत्र महा बलदाई। संतन के प्रभु सदा सहाई॥",
          en: "Son of Anjani, giver of great strength. Ever the helper and lord of the saints.",
        },
        {
          hi: "दे बीरा रघुनाथ पठाए। लंका जारि सिया सुधि लाए॥",
          en: "Sent forth by brave Raghunath. He burned Lanka and brought news of Sita.",
        },
        {
          hi: "लंका सो कोट समुद्र सी खाई। जात पवनसुत बार न लाई॥",
          en: "Lanka's fort with an ocean for a moat. The son of the wind crossed it without delay.",
        },
        {
          hi: "लंका जारि असुर संहारे। सियारामजी के काज संवारे॥",
          en: "He burned Lanka and destroyed the demons. He accomplished the work of Sita and Rama.",
        },
        {
          hi: "आरती कीजै हनुमान लला की।\nदुष्ट दलन रघुनाथ कला की॥",
          en: "Let us perform the aarti of dear child Hanuman.\nWho destroys the wicked by the power of Raghunath (Rama).",
        },
      ],
    },
  },
  {
    id: "krishna",
    name: "Krishna",
    sanskritName: "कृष्ण",
    epithet: "The Divine Charioteer",
    color: "#3b5bab",
    mantra: {
      devanagari: "ॐ नमो भगवते वासुदेवाय",
      transliteration: "Om Namo Bhagavate Vasudevaya",
      meaning: "I bow to Lord Vasudeva (Krishna), the all-pervading divine consciousness.",
    },
    aarti: {
      title: "Aarti Kunj Bihari Ki",
      hiTitle: "आरती कुंजबिहारी की",
      verses: [
        {
          hi: "आरती कुंजबिहारी की, श्री गिरधर कृष्ण मुरारी की॥",
          en: "Aarti to the one who plays in the groves of Vrindavan, to Krishna, Murari, the lifter of the mountain.",
        },
        {
          hi: "गले में बैजंती माला, बजावे मुरली मधुर बाला।\nश्रवण में कुण्डल झलकाला, नंद के आनंद नंदलाला॥",
          en: "A garland of forest flowers around his neck, he plays his sweet flute.\nEarrings shine in his ears, he is Nandlala, the joy of Nanda.",
        },
        {
          hi: "गगन सम अंग कांति कारी, राधिका चमक रही आली।\nलतन में ठाढ़े बनमाली, भ्रमर सी अलक कस्तूरी तिलक चारु सी भाल विराजे॥",
          en: "His form gleams like the sky, Radhika shines beside him.\nThe garland-wearer stands among the vines, curls like bees, a musk tilak graces his beautiful brow.",
        },
        {
          hi: "जिसकी शोभा बरणि न जाई, यमुना तट सेवत बनवारी।\nजय जय जय हनुमान लाला, जय गिरधर मुरारी की॥",
          en: "Whose beauty cannot be described, worshipped by the banks of the Yamuna.\nVictory to Krishna, the lifter of the mountain, Murari.",
        },
        {
          hi: "आरती कुंजबिहारी की, श्री गिरधर कृष्ण मुरारी की॥",
          en: "Aarti to the one who plays in the groves of Vrindavan, to Krishna, Murari, the lifter of the mountain.",
        },
      ],
    },
  },
];

export const getDeity = (id: string) => deities.find((d) => d.id === id);
