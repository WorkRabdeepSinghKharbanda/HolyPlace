export interface Verse {
  hi: string;
  translit?: string;
  en: string;
}

export type ChantType = "mantra" | "aarti" | "chalisa" | "stotra" | "prayer" | "shabad";

export interface Chant {
  id: string;
  type: ChantType;
  typeLabel: string;
  title: string;
  nativeTitle: string;
  verses: Verse[];
  occasions?: string[];
}

export interface Figure {
  id: string;
  name: string;
  nativeName: string;
  epithet: string;
  chants: Chant[];
}

export interface Religion {
  id: string;
  name: string;
  tagline: string;
  color: string;
  script: string;
  figures: Figure[];
}

export const religions: Religion[] = [
  {
    id: "hinduism",
    name: "Hinduism",
    tagline: "Aarti, mantra, and chalisa for the deities",
    color: "#c9962c",
    script: "Devanagari",
    figures: [
      {
        id: "ganesha",
        name: "Ganesha",
        nativeName: "गणेश",
        epithet: "Remover of Obstacles",
        chants: [
          {
            id: "mantra",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Ganesha Mantra",
            nativeTitle: "गणेश मंत्र",
            occasions: ["new beginnings", "new home", "removing obstacles"],
            verses: [
              {
                hi: "ॐ गं गणपतये नमः",
                translit: "Om Gam Ganapataye Namah",
                en: "I bow to Ganapati, the lord who removes obstacles and grants success.",
              },
            ],
          },
          {
            id: "vakratunda-shloka",
            type: "stotra",
            typeLabel: "Shloka",
            title: "Vakratunda Mahakaya Shloka",
            nativeTitle: "वक्रतुण्ड महाकाय श्लोक",
            verses: [
              {
                hi: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
                translit: "Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada",
                en: "O curved-trunk, mighty-bodied one, radiant as a million suns, O Lord, make all my endeavors free of obstacles, always.",
              },
            ],
          },
          {
            id: "aarti",
            type: "aarti",
            typeLabel: "Aarti",
            title: "Jai Ganesh Aarti",
            nativeTitle: "जय गणेश आरती",
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
        ],
      },
      {
        id: "shiva",
        name: "Shiva",
        nativeName: "शिव",
        epithet: "The Auspicious One",
        chants: [
          {
            id: "mantra",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Shiva Mantra",
            nativeTitle: "शिव मंत्र",
            occasions: ["peace", "inner strength", "meditation"],
            verses: [
              {
                hi: "ॐ नमः शिवाय",
                translit: "Om Namah Shivaya",
                en: "I bow to Shiva, the auspicious one, the inner Self of all.",
              },
            ],
          },
          {
            id: "mahamrityunjaya",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Mahamrityunjaya Mantra",
            nativeTitle: "महामृत्युंजय मंत्र",
            occasions: ["health", "healing", "protection"],
            verses: [
              {
                hi: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥",
                translit: "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam, Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat",
                en: "We worship the three-eyed one, fragrant and nourishing. May he liberate us from death, as a cucumber is freed from its vine, for the sake of immortality.",
              },
            ],
          },
          {
            id: "aarti",
            type: "aarti",
            typeLabel: "Aarti",
            title: "Om Jai Shiv Omkara",
            nativeTitle: "ॐ जय शिव ओंकारा",
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
        ],
      },
      {
        id: "vishnu",
        name: "Vishnu",
        nativeName: "विष्णु",
        epithet: "The Preserver",
        chants: [
          {
            id: "mantra",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Vishnu Mantra",
            nativeTitle: "विष्णु मंत्र",
            occasions: ["protection", "peace", "new beginnings"],
            verses: [
              {
                hi: "ॐ नमो नारायणाय",
                translit: "Om Namo Narayanaya",
                en: "I bow to Narayana, the eternal preserver and sustainer of the universe.",
              },
            ],
          },
          {
            id: "shantakaram",
            type: "stotra",
            typeLabel: "Shloka",
            title: "Shantakaram Bhujagashayanam",
            nativeTitle: "शान्ताकारं भुजगशयनम्",
            verses: [
              {
                hi: "शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं।\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्॥",
                translit: "Shantakaram Bhujagashayanam Padmanabham Suresham, Vishvadharam Gaganasadrisham Meghavarnam Shubhangam",
                en: "Peaceful in form, resting on the serpent, lotus-naveled, lord of the gods, sustainer of the universe, vast as the sky, cloud-hued, of auspicious form.",
              },
            ],
          },
          {
            id: "aarti",
            type: "aarti",
            typeLabel: "Aarti",
            title: "Om Jai Jagdish Hare",
            nativeTitle: "ॐ जय जगदीश हरे",
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
        ],
      },
      {
        id: "lakshmi",
        name: "Lakshmi",
        nativeName: "लक्ष्मी",
        epithet: "Goddess of Wealth and Prosperity",
        chants: [
          {
            id: "mantra",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Lakshmi Mantra",
            nativeTitle: "लक्ष्मी मंत्र",
            occasions: ["wealth", "new home", "prosperity"],
            verses: [
              {
                hi: "ॐ श्रीं महालक्ष्म्यै नमः",
                translit: "Om Shreem Mahalakshmyai Namah",
                en: "I bow to Mahalakshmi, the goddess of abundance, prosperity, and grace.",
              },
            ],
          },
          {
            id: "gayatri",
            type: "mantra",
            typeLabel: "Gayatri Mantra",
            title: "Lakshmi Gayatri Mantra",
            nativeTitle: "लक्ष्मी गायत्री मंत्र",
            verses: [
              {
                hi: "ॐ महालक्ष्म्यै च विद्महे विष्णुपत्न्यै च धीमहि।\nतन्नो लक्ष्मीः प्रचोदयात्॥",
                translit: "Om Mahalakshmyai Cha Vidmahe Vishnupatnyai Cha Dhimahi, Tanno Lakshmih Prachodayat",
                en: "We meditate on the great Mahalakshmi, consort of Vishnu. May that Lakshmi inspire and guide us.",
              },
            ],
          },
          {
            id: "namastestu",
            type: "stotra",
            typeLabel: "Shloka",
            title: "Namastestu Mahamaye",
            nativeTitle: "नमस्तेस्तु महामाये",
            verses: [
              {
                hi: "नमस्तेस्तु महामाये श्रीपीठे सुरपूजिते।\nशङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥",
                translit: "Namaste'stu Mahamaye Shreepeethe Surapoojite, Shankhachakragadahaste Mahalakshmi Namo'stu Te",
                en: "Salutations to you, O great illusion, seated on the throne of Shri, worshipped by the gods; bearer of the conch, discus, and mace, O Mahalakshmi, salutations to you.",
              },
            ],
          },
          {
            id: "aarti",
            type: "aarti",
            typeLabel: "Aarti",
            title: "Om Jai Lakshmi Mata",
            nativeTitle: "ॐ जय लक्ष्मी माता",
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
        ],
      },
      {
        id: "durga",
        name: "Durga",
        nativeName: "दुर्गा",
        epithet: "The Invincible Mother",
        chants: [
          {
            id: "mantra",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Durga Mantra",
            nativeTitle: "दुर्गा मंत्र",
            occasions: ["protection", "strength", "courage"],
            verses: [
              {
                hi: "ॐ दुं दुर्गायै नमः",
                translit: "Om Dum Durgayai Namah",
                en: "I bow to Durga, the fierce protecting mother who destroys all obstacles.",
              },
            ],
          },
          {
            id: "gayatri",
            type: "mantra",
            typeLabel: "Gayatri Mantra",
            title: "Durga Gayatri Mantra",
            nativeTitle: "दुर्गा गायत्री मंत्र",
            verses: [
              {
                hi: "ॐ गिरिजायै च विद्महे शिवप्रियायै च धीमहि।\nतन्नो दुर्गा प्रचोदयात्॥",
                translit: "Om Girijayai Cha Vidmahe Shivapriyayai Cha Dhimahi, Tanno Durga Prachodayat",
                en: "We meditate on the daughter of the mountains, beloved of Shiva. May that Durga inspire and guide us.",
              },
            ],
          },
          {
            id: "ya-devi",
            type: "stotra",
            typeLabel: "Shloka",
            title: "Ya Devi Sarvabhuteshu",
            nativeTitle: "या देवी सर्वभूतेषु",
            verses: [
              {
                hi: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
                translit: "Ya Devi Sarvabhuteshu Shaktirupena Samsthita, Namastasyai Namastasyai Namastasyai Namo Namah",
                en: "To the Goddess who abides in all beings in the form of power, salutations to her, salutations to her, salutations to her, again and again we bow.",
              },
            ],
          },
          {
            id: "aarti",
            type: "aarti",
            typeLabel: "Aarti",
            title: "Jai Ambe Gauri",
            nativeTitle: "जय अम्बे गौरी",
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
        ],
      },
      {
        id: "saraswati",
        name: "Saraswati",
        nativeName: "सरस्वती",
        epithet: "Goddess of Knowledge and Arts",
        chants: [
          {
            id: "mantra",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Saraswati Mantra",
            nativeTitle: "सरस्वती मंत्र",
            occasions: ["exams", "learning", "creativity"],
            verses: [
              {
                hi: "ॐ ऐं सरस्वत्यै नमः",
                translit: "Om Aim Saraswatyai Namah",
                en: "I bow to Saraswati, the goddess of wisdom, speech, and the arts.",
              },
            ],
          },
          {
            id: "vandana",
            type: "stotra",
            typeLabel: "Vandana",
            title: "Ya Kundendu Tushara Haradhavala",
            nativeTitle: "या कुन्देन्दु तुषारहारधवला",
            occasions: ["exams", "learning"],
            verses: [
              {
                hi: "या कुन्देन्दु तुषारहारधवला या शुभ्रवस्त्रावृता।\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना॥",
                translit: "Ya Kundendu Tushara Haradhavala Ya Shubhravastravrita, Ya Veenavaradandamanditakara Ya Shvetapadmasana",
                en: "She who is white as the jasmine, moon, and snow, clothed in pure white, whose hand is graced by the veena, seated on a white lotus.",
              },
            ],
          },
          {
            id: "aarti",
            type: "aarti",
            typeLabel: "Aarti",
            title: "Jai Saraswati Mata",
            nativeTitle: "जय सरस्वती माता",
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
        ],
      },
      {
        id: "hanuman",
        name: "Hanuman",
        nativeName: "हनुमान",
        epithet: "The Devoted Protector",
        chants: [
          {
            id: "mantra",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Hanuman Mantra",
            nativeTitle: "हनुमान मंत्र",
            occasions: ["protection", "strength", "courage", "removing fear"],
            verses: [
              {
                hi: "ॐ हं हनुमते नमः",
                translit: "Om Han Hanumate Namah",
                en: "I bow to Hanuman, the mighty devotee whose strength and devotion protect all who call on him.",
              },
            ],
          },
          {
            id: "aarti",
            type: "aarti",
            typeLabel: "Aarti",
            title: "Aarti Kije Hanuman Lala Ki",
            nativeTitle: "आरती कीजै हनुमान लला की",
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
          {
            id: "chalisa",
            type: "chalisa",
            typeLabel: "Chalisa",
            title: "Hanuman Chalisa",
            nativeTitle: "हनुमान चालीसा",
            occasions: ["protection", "strength", "courage", "removing obstacles"],
            verses: [
              {
                hi: "दोहा॥\nश्री गुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउं रघुबर बिमल जसु, जो दायकु फल चारि॥\nबुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।\nबल बुधि विद्या देहु मोहिं, हरहु कलेस बिकार॥",
                en: "Doha: Cleansing the mirror of my mind with the dust of my Guru's lotus feet, I describe the pure fame of Raghubar (Rama), which grants the four fruits of life. Knowing my body devoid of wisdom, I remember the Son of the Wind (Hanuman). Grant me strength, wisdom, and knowledge, O Hanuman, and remove my afflictions and flaws.",
              },
              {
                hi: "जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुं लोक उजागर॥\nराम दूत अतुलित बल धामा। अंजनि-पुत्र पवनसुत नामा॥",
                en: "Victory to Hanuman, ocean of wisdom and virtue. Victory to the lord of monkeys, illuminator of the three worlds. Messenger of Rama, abode of matchless strength, known as the son of Anjani and the son of the Wind.",
              },
              {
                hi: "महाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥\nकंचन बरन बिराज सुबेसा। कानन कुंडल कुंचित केसा॥",
                en: "Great hero, valiant one of the thunderbolt-like body. Dispeller of evil thought, companion of good sense. Golden of hue, splendidly adorned, with earrings and curly hair.",
              },
              {
                hi: "हाथ बज्र औ ध्वजा बिराजै। कांधे मूंज जनेऊ साजै॥\nसंकर सुवन केसरीनंदन। तेज प्रताप महा जग बंदन॥",
                en: "In your hand shine the mace and the banner; a sacred thread of munja grass adorns your shoulder. Son of Shiva, joy of Kesari, your splendor and glory are worshipped throughout the world.",
              },
              {
                hi: "बिद्यावान गुनी अति चातुर। राम काज करिबे को आतुर॥\nप्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥",
                en: "Learned, virtuous, and exceedingly clever, ever eager to accomplish Rama's tasks. Delighting in hearing the Lord's deeds, with Rama, Lakshmana, and Sita dwelling in your heart.",
              },
              {
                hi: "सूक्ष्म रूप धरि सियहिं दिखावा। बिकट रूप धरि लंक जरावा॥\nभीम रूप धरि असुर संहारे। रामचंद्र के काज संवारे॥",
                en: "Taking a subtle form, you appeared before Sita; taking a fearsome form, you burned Lanka. Taking a mighty form, you destroyed the demons, accomplishing the work of Ramachandra.",
              },
              {
                hi: "लाय संजीवन लखन जियाये। श्री रघुबीर हरषि उर लाये॥\nरघुपति कीन्ही बहुत बड़ाई। तुम मम प्रिय भरतहि सम भाई॥",
                en: "Bringing the Sanjeevani herb, you revived Lakshmana; joyfully Raghubir embraced you to his heart. Raghupati praised you greatly: you are as dear to me as my brother Bharat.",
              },
              {
                hi: "सहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कंठ लगावैं॥\nसनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा॥",
                en: "May a thousand mouths sing your glory, said the Lord of Lakshmi, embracing you. Sanaka and the other sages, Brahma, Narada, Sharada, and the lord of serpents all praise you.",
              },
              {
                hi: "जम कुबेर दिगपाल जहां ते। कबि कोबिद कहि सके कहां ते॥\nतुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राज पद दीन्हा॥",
                en: "Yama, Kubera, and the guardians of the directions, poets and scholars — none can fully describe you. You did great favor to Sugriva, uniting him with Rama and granting him his kingdom.",
              },
              {
                hi: "तुम्हरो मंत्र बिभीषन माना। लंकेस्वर भए सब जग जाना॥\nजुग सहस्र जोजन पर भानू। लील्यो ताहि मधुर फल जानू॥",
                en: "Vibhishana accepted your counsel and became lord of Lanka, as the whole world knows. The sun, thousands of leagues away, you swallowed it thinking it a sweet fruit.",
              },
              {
                hi: "प्रभु मुद्रिका मेलि मुख माहीं। जलधि लांघि गये अचरज नाहीं॥\nदुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥",
                en: "Holding the Lord's ring in your mouth, you leapt across the ocean — no wonder at all. Every difficult task in this world becomes easy through your grace.",
              },
              {
                hi: "राम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥\nसब सुख लहै तुम्हारी सरना। तुम रक्षक काहू को डरना॥",
                en: "You are the guardian at Rama's door; none may enter without your leave. All find happiness in your shelter; with you as protector, there is nothing to fear.",
              },
              {
                hi: "आपन तेज सम्हारो आपै। तीनों लोक हांक तें कांपै॥\nभूत पिसाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥",
                en: "Only you can contain your own splendor; all three worlds tremble at your roar. Ghosts and evil spirits dare not come near when your great name, Mahavir, is spoken.",
              },
              {
                hi: "नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥\nसंकट तें हनुमान छुड़ावै। मन क्रम बचन ध्यान जो लावै॥",
                en: "Disease is destroyed, all pain is removed, by ceaselessly chanting the name of brave Hanuman. Hanuman frees from every trouble those who fix their mind, deed, and word upon him.",
              },
              {
                hi: "सब पर राम तपस्वी राजा। तिन के काज सकल तुम साजा॥\nऔर मनोरथ जो कोई लावै। सोइ अमित जीवन फल पावै॥",
                en: "Rama, the ascetic king, reigns above all, and you accomplish all his works. Whoever else brings a desire to you attains the boundless fruit of life.",
              },
              {
                hi: "चारों जुग परताप तुम्हारा। है परसिद्ध जगत उजियारा॥\nसाधु संत के तुम रखवारे। असुर निकंदन राम दुलारे॥",
                en: "Your glory pervades all four ages, celebrated and radiant throughout the world. You are the protector of saints and sages, destroyer of demons, beloved of Rama.",
              },
              {
                hi: "अष्ट सिद्धि नौ निधि के दाता। अस बर दीन जानकी माता॥\nराम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा॥",
                en: "Giver of the eight siddhis and nine nidhis, this boon was granted to you by Mother Janaki. You possess the elixir of devotion to Rama; may you ever remain the servant of Raghupati.",
              },
              {
                hi: "तुम्हरे भजन राम को पावै। जनम जनम के दुख बिसरावै॥\nअंतकाल रघुबर पुर जाई। जहां जन्म हरिभक्त कहाई॥",
                en: "Through devotion to you, one attains Rama, and forgets the sorrows of many lifetimes. At the final hour, one goes to Raghubar's abode, forever known as a devotee of Hari.",
              },
              {
                hi: "और देवता चित्त न धरई। हनुमत सेइ सर्ब सुख करई॥\nसंकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥",
                en: "One need hold no other deity in mind; serving Hanuman brings all happiness. Every trouble is cut away and all pain is erased for those who remember mighty Hanuman.",
              },
              {
                hi: "जय जय जय हनुमान गोसाईं। कृपा करहु गुरुदेव की नाईं॥\nजो सत बार पाठ कर कोई। छूटहि बंदि महा सुख होई॥",
                en: "Glory, glory, glory to Hanuman, the master; show grace as a guru would. Whoever recites this a hundred times is freed from bondage and attains great happiness.",
              },
              {
                hi: "जो यह पढ़ै हनुमान चालीसा। होय सिद्धि साखी गौरीसा॥\nतुलसीदास सदा हरि चेरा। कीजै नाथ हृदय मह डेरा॥",
                en: "Whoever reads this Hanuman Chalisa attains success, with Shiva himself as witness. Tulsidas, ever the servant of Hari, prays: O Lord, make your home within my heart.",
              },
              {
                hi: "दोहा॥\nपवनतनय संकट हरन, मंगल मूरति रूप।\nराम लखन सीता सहित, हृदय बसहु सुर भूप॥",
                en: "Doha: O son of the Wind, remover of troubles, embodiment of auspiciousness, dwell in my heart along with Rama, Lakshmana, and Sita, O king of the gods.",
              },
            ],
          },
        ],
      },
      {
        id: "krishna",
        name: "Krishna",
        nativeName: "कृष्ण",
        epithet: "The Divine Charioteer",
        chants: [
          {
            id: "mantra",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Krishna Mantra",
            nativeTitle: "कृष्ण मंत्र",
            occasions: ["guidance", "devotion"],
            verses: [
              {
                hi: "ॐ नमो भगवते वासुदेवाय",
                translit: "Om Namo Bhagavate Vasudevaya",
                en: "I bow to Lord Vasudeva (Krishna), the all-pervading divine consciousness.",
              },
            ],
          },
          {
            id: "gita-2-47",
            type: "stotra",
            typeLabel: "Gita Shloka",
            title: "Bhagavad Gita 2.47",
            nativeTitle: "भगवद्गीता २.४७",
            occasions: ["guidance", "career", "letting go of anxiety"],
            verses: [
              {
                hi: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
                translit: "Karmanye Vadhikaraste Ma Phaleshu Kadachana, Ma Karmaphalaheturbhurma Te Sangostvakarmani",
                en: "You have a right to perform your duty, but never to the fruits of your actions. Let not the fruits of action be your motive, nor let your attachment be to inaction.",
              },
            ],
          },
          {
            id: "aarti",
            type: "aarti",
            typeLabel: "Aarti",
            title: "Aarti Kunj Bihari Ki",
            nativeTitle: "आरती कुंजबिहारी की",
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
        ],
      },
      {
        id: "kali",
        name: "Kali",
        nativeName: "काली",
        epithet: "The Fierce Mother of Time and Transformation",
        chants: [
          {
            id: "mantra",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Kali Mantra",
            nativeTitle: "काली मंत्र",
            occasions: ["courage", "transformation", "removing fear"],
            verses: [
              {
                hi: "ॐ क्रीं कालिकायै नमः",
                translit: "Om Kreem Kalikayai Namah",
                en: "I bow to Kali, the fierce and compassionate goddess of time and transformation.",
              },
            ],
          },
          {
            id: "dhyana-shloka",
            type: "stotra",
            typeLabel: "Dhyana Shloka",
            title: "Karalavadanam Dhyana Shloka",
            nativeTitle: "करालवदनां ध्यान श्लोक",
            verses: [
              {
                hi: "करालवदनां घोरां मुक्तकेशीं चतुर्भुजाम्।\nकालिकां दक्षिणां दिव्यां मुण्डमालाविभूषिताम्॥",
                translit: "Karalavadanam Ghoram Muktakeshim Chaturbhujam, Kalikam Dakshinam Divyam Mundamalavibhushitam",
                en: "Terrifying of face, fierce, with hair unbound, four-armed; the divine Dakshina Kalika, adorned with a garland of skulls.",
              },
            ],
          },
        ],
      },
      {
        id: "parvati",
        name: "Parvati",
        nativeName: "पार्वती",
        epithet: "Daughter of the Mountains, Mother of the Universe",
        chants: [
          {
            id: "mantra",
            type: "mantra",
            typeLabel: "Mantra",
            title: "Parvati Mantra",
            nativeTitle: "पार्वती मंत्र",
            occasions: ["marriage", "family", "devotion"],
            verses: [
              {
                hi: "ॐ पार्वत्यै नमः",
                translit: "Om Parvatyai Namah",
                en: "I bow to Parvati, daughter of the mountains, beloved consort of Shiva and mother of the universe.",
              },
            ],
          },
          {
            id: "sarvamangala",
            type: "stotra",
            typeLabel: "Shloka",
            title: "Sarvamangala Mangalye",
            nativeTitle: "सर्वमंगलमांगल्ये",
            verses: [
              {
                hi: "सर्वमंगलमांगल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
                translit: "Sarvamangala Mangalye Shive Sarvarthasadhike, Sharanye Tryambake Gauri Narayani Namo'stu Te",
                en: "O auspicious one, bringer of all auspiciousness, accomplisher of all goals, giver of refuge, three-eyed Gauri, Narayani, salutations to you.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sikhism",
    name: "Sikhism",
    tagline: "Bani from the Guru Granth Sahib",
    color: "#1a6bb5",
    script: "Gurmukhi",
    figures: [
      {
        id: "waheguru",
        name: "Waheguru",
        nativeName: "ਵਾਹਿਗੁਰੂ",
        epithet: "The Wondrous Lord",
        chants: [
          {
            id: "mool-mantar",
            type: "mantra",
            typeLabel: "Mool Mantar",
            title: "Mool Mantar",
            nativeTitle: "ਮੂਲ ਮੰਤਰ",
            occasions: ["meditation", "guidance", "peace"],
            verses: [
              {
                hi: "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ॥",
                translit: "Ik Onkar Sat Naam Karta Purakh Nirbhau Nirvair Akal Moorat Ajooni Saibhang Gur Prasad",
                en: "There is one God, whose name is Truth, the Creator, without fear, without hate, timeless in form, unborn, self-existent, known by the Guru's grace.",
              },
              {
                hi: "ਜਪੁ॥ ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ॥ ਹੈ ਭੀ ਸਚੁ ਨਾਨਕ ਹੋਸੀ ਭੀ ਸਚੁ॥੧॥",
                translit: "Jap. Aad Sach Jugaad Sach. Hai Bhee Sach Naanak Hosee Bhee Sach.",
                en: "Chant and meditate: True in the beginning, True throughout the ages. True here and now, O Nanak, forever and ever True.",
              },
            ],
          },
          {
            id: "japji-pauri-1",
            type: "shabad",
            typeLabel: "Japji Sahib",
            title: "Japji Sahib — Pauri 1",
            nativeTitle: "ਜਪੁਜੀ ਸਾਹਿਬ — ਪਉੜੀ ੧",
            verses: [
              {
                hi: "ਸੋਚੈ ਸੋਚਿ ਨ ਹੋਵਈ ਜੇ ਸੋਚੀ ਲਖ ਵਾਰ॥\nਚੁਪੈ ਚੁਪ ਨ ਹੋਵਈ ਜੇ ਲਾਇ ਰਹਾ ਲਿਵ ਤਾਰ॥\nਭੁਖਿਆ ਭੁਖ ਨ ਉਤਰੀ ਜੇ ਬੰਨਾ ਪੁਰੀਆ ਭਾਰ॥\nਸਹਸ ਸਿਆਣਪਾ ਲਖ ਹੋਹਿ ਤ ਇਕ ਨ ਚਲੈ ਨਾਲਿ॥\nਕਿਵ ਸਚਿਆਰਾ ਹੋਈਐ ਕਿਵ ਕੂੜੈ ਤੁਟੈ ਪਾਲਿ॥\nਹੁਕਮਿ ਰਜਾਈ ਚਲਣਾ ਨਾਨਕ ਲਿਖਿਆ ਨਾਲਿ॥੧॥",
                en: "By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times. By remaining silent, inner silence is not obtained, even by remaining absorbed deep within. The hunger of the hungry is not appeased, even by piling up loads of worldly goods. Hundreds of thousands of clever tricks, but not even one goes along with you in the end. So how can you become truthful? And how can the veil of illusion be torn away? By walking in the Way of His Will as He has ordained — O Nanak, this is written in our destiny.",
              },
            ],
          },
          {
            id: "ardas-closing",
            type: "prayer",
            typeLabel: "Ardas",
            title: "Ardas — Closing Prayer",
            nativeTitle: "ਅਰਦਾਸ",
            occasions: ["wellbeing for all", "protection", "gratitude"],
            verses: [
              {
                hi: "ਨਾਨਕ ਨਾਮ ਚੜ੍ਹਦੀ ਕਲਾ॥ ਤੇਰੇ ਭਾਣੇ ਸਰਬੱਤ ਦਾ ਭਲਾ॥",
                translit: "Nanak Naam Chardi Kala, Tere Bhaane Sarbat Da Bhala",
                en: "Through Your Name, O Nanak, may we ever be in high spirits; in Your Will, may there be well-being for all.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "christianity",
    name: "Christianity",
    tagline: "Prayers to Christ and the Blessed Mother",
    color: "#7a2e3a",
    script: "Latin",
    figures: [
      {
        id: "jesus",
        name: "Jesus Christ",
        nativeName: "Iesus Christus",
        epithet: "Son of God, the Good Shepherd",
        chants: [
          {
            id: "lords-prayer",
            type: "prayer",
            typeLabel: "Prayer",
            title: "The Lord's Prayer",
            nativeTitle: "Pater Noster",
            occasions: ["guidance", "forgiveness", "daily practice"],
            verses: [
              {
                hi: "Pater noster, qui es in caelis, sanctificetur nomen tuum.\nAdveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra.\nPanem nostrum quotidianum da nobis hodie,\net dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris.\nEt ne nos inducas in tentationem, sed libera nos a malo. Amen.",
                en: "Our Father, who art in heaven, hallowed be thy name.\nThy kingdom come, thy will be done, on earth as it is in heaven.\nGive us this day our daily bread,\nand forgive us our trespasses, as we forgive those who trespass against us.\nAnd lead us not into temptation, but deliver us from evil. Amen.",
              },
            ],
          },
          {
            id: "psalm-23",
            type: "prayer",
            typeLabel: "Psalm",
            title: "Psalm 23 — The Lord Is My Shepherd",
            nativeTitle: "Dominus Regit Me",
            occasions: ["comfort", "protection", "grief"],
            verses: [
              {
                hi: "Dominus regit me, et nihil mihi deerit.\nIn loco pascuae, ibi me collocavit; super aquam refectionis educavit me.\nAnimam meam convertit; deduxit me super semitas iustitiae propter nomen suum.\nNam et si ambulavero in medio umbrae mortis, non timebo mala, quoniam tu mecum es;\nvirga tua et baculus tuus, ipsa me consolata sunt.",
                en: "The Lord is my shepherd; I shall not want.\nHe maketh me to lie down in green pastures: he leadeth me beside the still waters.\nHe restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.\nYea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me;\nthy rod and thy staff they comfort me.",
              },
            ],
          },
        ],
      },
      {
        id: "mary",
        name: "Virgin Mary",
        nativeName: "Maria",
        epithet: "Mother of God",
        chants: [
          {
            id: "hail-mary",
            type: "prayer",
            typeLabel: "Prayer",
            title: "Hail Mary",
            nativeTitle: "Ave Maria",
            occasions: ["intercession", "protection", "family"],
            verses: [
              {
                hi: "Ave Maria, gratia plena, Dominus tecum.\nBenedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus.\nSancta Maria, Mater Dei, ora pro nobis peccatoribus,\nnunc et in hora mortis nostrae. Amen.",
                en: "Hail Mary, full of grace, the Lord is with thee.\nBlessed art thou amongst women, and blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God, pray for us sinners,\nnow and at the hour of our death. Amen.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getReligion = (id: string) => religions.find((r) => r.id === id);
export const getFigure = (religionId: string, figureId: string) =>
  getReligion(religionId)?.figures.find((f) => f.id === figureId);
export const getChant = (religionId: string, figureId: string, chantId: string) =>
  getFigure(religionId, figureId)?.chants.find((c) => c.id === chantId);
