var CTextList = Class.create(
{
  initialize: function()
  {
    this.texts_ = new Object();
  },
  
  add: function(text)
  {
    if(this.texts_[text.getLabel()] == undefined)
    {
      this.texts_[text.getLabel()] = new Array();
    };
    
    this.texts_[text.getLabel()].push(text);
  },
  
  translate: function(language)
  {
    var translation;
    var texts;
    
    for(var label in this.texts_)
    {
      translation = translate(label, language);
      texts = this.texts_[label];
      
      for(var index = 0; index < texts.length; ++index)
      {
        texts[index].setText(translation);
      };
    };
  }
  
});

var CText = Class.create(
{
  
  initialize: function(label, obj)
  {
    this.label_ = label;
    this.obj_ = obj;
  },
  
  getLabel: function()
  {
    return this.label_;
  },
  
  setText: function(new_text)
  {
    this.obj_.innerHTML = new_text.replace("<", "&lt;").replace(">", "&gt;");
  }
  
});


var CAttributeText = Class.create(CText,
{
  
  initialize: function($super, label, obj, attribute)
  {
    $super(label, obj);
    this.attribute_ = attribute;
  },
  
  setText: function(new_text)
  {
    this.obj_.writeAttribute(this.attribute_, new_text);
  }
  
});


var translation = new Object();

translation["en"] =
{
    "uiLanguageName" : "English"
  , "uiSlotsTitle" : "Select Item Slots"
  , "uiCraftWindowTitle" : "The Crafting Window"
  , "uiItemListTitle" : "The Items inserted"
  , "uiPreviewTitle" : "Stat Preview"
  , "uiSelectQuantity" : "Select Quantity"
  , "uiSheetID" : "SheetID"
  , "uiQuality" : "Quality"
  , "uiFamily" : "Family"
  , "uiColor" : "Color"
  , "uiAllItemParts" : "All Item Parts"
  , "uiEcosystem" : "Ecosystem"
  
  , "uiItemRMClass0" : "Basic"
  , "uiItemRMClass1" : "Fine"
  , "uiItemRMClass2" : "Choice"
  , "uiItemRMClass3" : "Excellent"
  , "uiItemRMClass4" : "Supreme"

  , "mpftMpL" : "Blade"
  , "mpftMpH" : "Hammer"
  , "mpftMpP" : "Point"
  , "mpftMpM" : "Shaft"
  , "mpftMpG" : "Grip"
  , "mpftMpC" : "Counterweight"
  , "mpftMpGA" : "Trigger"
  , "mpftMpPE" : "Firing pin"
  , "mpftMpCA" : "Barrel"
  , "mpftMpE" : "Explosive"
  , "mpftMpEN" : "Ammo jacket"
  , "mpftMpPR" : "Ammo bullet"
  , "mpftMpCR" : "Armour shell"
  , "mpftMpRI" : "Lining"
  , "mpftMpRE" : "Stuffing"
  , "mpftMpAT" : "Armour clip"
  , "mpftMpSU" : "Jewel setting"
  , "mpftMpED" : "Jewel"
  , "mpftMpBT" : "Blacksmith tool"
  , "mpftMpPES" : "Pestle tool"
  , "mpftMpSH" : "Sharpener tool"
  , "mpftMpTK" : "Tunneling knife"
  , "mpftMpJH" : "Jewelry hammer"
  , "mpftMpCF" : "Campfire"
  , "mpftMpVE" : "Clothes"
  , "mpftMpMF" : "Magic Focus"

  , "mpcol0" : "Red"
  , "mpcol1" : "Beige"
  , "mpcol2" : "Green"
  , "mpcol3" : "Turquoise"
  , "mpcol4" : "Blue"
  , "mpcol5" : "Purple"
  , "mpcol6" : "White"
  , "mpcol7" : "Black"
  , "mpstat0" : "Durability"
  , "mpstat1" : "Lightness"
  , "mpstat2" : "Sap Load"
  , "mpstat3" : "DMG"
  , "mpstat4" : "Speed"
  , "mpstat5" : "Range"
  , "mpstat6" : "Dodge Modifier"
  , "mpstat7" : "Parry Modifier"
  , "mpstat8" : "Adversary Dodge Modifier"
  , "mpstat9" : "Adversary Parry Modifier"
  , "mpstat10" : "Protection Factor"
  , "mpstat11" : "Max Slashing Protection"
  , "mpstat12" : "Max Smashing Protection"
  , "mpstat13" : "Max Piercing Protection"
  , "mpstat14" : "Acid Protection"
  , "mpstat15" : "Cold Protection"
  , "mpstat16" : "Rot Protection"
  , "mpstat17" : "Fire Protection"
  , "mpstat18" : "Shockwave Protection"
  , "mpstat19" : "Poison Protection"
  , "mpstat20" : "Electric Protection"
  , "mpstat21" : "Desert Resistance"
  , "mpstat22" : "Forest Resistance"
  , "mpstat23" : "Lake Resistance"
  , "mpstat24" : "Jungle Resistance"
  , "mpstat25" : "Prime Roots Resistance"
  , "mpstat26" : "Elemental Cast Speed"
  , "mpstat27" : "Elemental Power"
  , "mpstat28" : "Off. Affliction Cast Speed"
  , "mpstat29" : "Off. Affliction Power"
  , "mpstat30" : "Def. Affliction Cast Speed"
  , "mpstat31" : "Def. Affliction Power"
  , "mpstat32" : "Heal Cast Speed"
  , "mpstat33" : "Heal Power"
  , "iompfUnknown" : "Unknown"
  , "iompf0" : "All Races"
  , "iompf1" : "Fyros only"
  , "iompf2" : "Matis only"
  , "iompf3" : "Tryker only"
  , "iompf4" : "Zorai only"
  , "iompf5" : "Tribe only"
  , "iompf6" : "Refugee only"
  , "iompf7" : "Karavan only"
  , "mpfam0" : "Undefined"
  , "mpfam1" : "Abhaya Wood"
  , "mpfam2" : "Adelina Splinter"
  , "mpfam3" : "Adriel Wood"
  , "mpfam4" : "Alicea Stem"
  , "mpfam5" : "Amelina Pollen"
  , "mpfam6" : "Anete Fiber"
  , "mpfam7" : "Angelica Stem"
  , "mpfam8" : "Arma Nail"
  , "mpfam9" : "Arma Spine"
  , "mpfam10" : "Astragali Silk"
  , "mpfam11" : "Avinash Wood"
  , "mpfam12" : "Barkers Wood"
  , "mpfam13" : "Batoo Amber"
  , "mpfam14" : "Beckers Bark"
  , "mpfam15" : "Beng Amber"
  , "mpfam16" : "Big Shell"
  , "mpfam17" : "Bitters Shell"
  , "mpfam18" : "Bodoc Horn"
  , "mpfam19" : "Bodoc Skin"
  , "mpfam20" : "Bodoc Nail"
  , "mpfam21" : "Buo Fiber"
  , "mpfam22" : "Butterfly Linen"
  , "mpfam23" : "Caprice Seed"
  , "mpfam24" : "Capryni Bone"
  , "mpfam25" : "Capryni Hoof"
  , "mpfam27" : "Carlea Leaf"
  , "mpfam28" : "Champion Shell"
  , "mpfam30" : "Crocifissa Bud"
  , "mpfam31" : "Cuty Shell"
  , "mpfam32" : "Dante Silk"
  , "mpfam33" : "Darleen Wood"
  , "mpfam34" : "Devesh Amber"
  , "mpfam35" : "Devraj Amber"
  , "mpfam36" : "Dung Spore"
  , "mpfam37" : "Dzao Fiber"
  , "mpfam38" : "Enola Cotton"
  , "mpfam39" : "Eucomina"
  , "mpfam40" : "Eyota Wood"
  , "mpfam41" : "Foomongus Moss"
  , "mpfam42" : "Fung Spore"
  , "mpfam43" : "Gingo Claw"
  , "mpfam44" : "Gingo Leather"
  , "mpfam45" : "Glorious Linen"
  , "mpfam46" : "Glue Resin"
  , "mpfam47" : "Goari Bud"
  , "mpfam48" : "Goari Shell"
  , "mpfam49" : "Gulatch Oil"
  , "mpfam50" : "Hash Amber"
  , "mpfam51" : "Helena Pollen"
  , "mpfam52" : "Hero Shell"
  , "mpfam53" : "Horny Shell"
  , "mpfam54" : "Igara Claw"
  , "mpfam56" : "Insects Shell"
  , "mpfam57" : "Iriku Amber"
  , "mpfam58" : "Irin Wood"
  , "mpfam59" : "Isabella Leaf"
  , "mpfam60" : "Izam Claw"
  , "mpfam61" : "Izam Spur"
  , "mpfam62" : "Jayadeep Amber"
  , "mpfam63" : "Jitendra Amber"
  , "mpfam64" : "Kachine Wood"
  , "mpfam65" : "Kiban Claw"
  , "mpfam66" : "Kincher Shell"
  , "mpfam67" : "Kincher Sting"
  , "mpfam68" : "Kiban Shell"
  , "mpfam69" : "Kipesta Shell"
  , "mpfam70" : "Kipee Bone"
  , "mpfam71" : "Kipee Claw"
  , "mpfam72" : "Kipee Shell"
  , "mpfam73" : "Kipucka Shell"
  , "mpfam74" : "Kipucka Rostrum"
  , "mpfam75" : "Kirosta Claw"
  , "mpfam76" : "Kirosta Sting"
  , "mpfam77" : "Kitin Secretion"
  , "mpfam78" : "Kizoar Tail"
  , "mpfam79" : "Koorin Wood"
  , "mpfam80" : "Lumper Bone"
  , "mpfam81" : "Lumper Skin"
  , "mpfam82" : "Lumper Spine"
  , "mpfam83" : "Lumper Whiskers"
  , "mpfam84" : "Manath Wood"
  , "mpfam85" : "Mektoub Claw"
  , "mpfam86" : "Mektoub Skin"
  , "mpfam87" : "Mektoub Trunk"
  , "mpfam88" : "Miakoda Wood"
  , "mpfam89" : "Mitexi Wood"
  , "mpfam90" : "Moojoo Wood"
  , "mpfam91" : "Moon Linen"
  , "mpfam92" : "Mooshy Mushroom"
  , "mpfam93" : "Motega Wood"
  , "mpfam94" : "Nita Wood"
  , "mpfam95" : "Oath Wood"
  , "mpfam96" : "Olathe Wood"
  , "mpfam97" : "Omalita Parasite"
  , "mpfam98" : "Paddooa Mushroom"
  , "mpfam99" : "Patee Wood Knot"
  , "mpfam100" : "Patee Wood Node"
  , "mpfam101" : "Perfling Bark"
  , "mpfam102" : "Pha Amber"
  , "mpfam103" : "Pilan Oil"
  , "mpfam106" : "Ragus Claw"
  , "mpfam107" : "Ragus Leather"
  , "mpfam109" : "Redhot Sap"
  , "mpfam110" : "Rosabella Parasite"
  , "mpfam111" : "Rubber"
  , "mpfam112" : "Salverio Leaf"
  , "mpfam113" : "Sarina Seed"
  , "mpfam114" : "Satilish Amber"
  , "mpfam115" : "Saurona Seed"
  , "mpfam116" : "Scrath Wood"
  , "mpfam117" : "Sha Amber"
  , "mpfam118" : "Shu Fiber"
  , "mpfam119" : "Silverweed Sap"
  , "mpfam120" : "Silvio Leaf"
  , "mpfam121" : "Slamers Shell"
  , "mpfam122" : "Sliders Shell"
  , "mpfam123" : "Smart Shell"
  , "mpfam124" : "Soo Amber"
  , "mpfam125" : "Splinter Shell"
  , "mpfam126" : "Subera Sponge"
  , "mpfam127" : "Takoda Cotton"
  , "mpfam128" : "Tama Wood"
  , "mpfam129" : "Tansy Wood"
  , "mpfam130" : "Tehya Cotton"
  , "mpfam131" : "Timari Bone"
  , "mpfam132" : "Timari Claw"
  , "mpfam133" : "Timari Skin"
  , "mpfam134" : "Torbak Claw"
  , "mpfam135" : "Torbak Fang"
  , "mpfam136" : "Torbak Horn"
  , "mpfam137" : "Torbak Leather"
  , "mpfam138" : "Tsao Amber"
  , "mpfam139" : "Valosera Silk"
  , "mpfam140" : "Varinx Fang"
  , "mpfam141" : "Varinx Leather"
  , "mpfam142" : "Visc Sap"
  , "mpfam143" : "Whisperers Shell"
  , "mpfam144" : "Yana Wood"
  , "mpfam145" : "Yber Leather"
  , "mpfam146" : "Yelk Bone"
  , "mpfam147" : "Yelk Moss"
  , "mpfam148" : "Yelk Mushroom"
  , "mpfam149" : "Yelk Nail"
  , "mpfam150" : "Yelk Shell"
  , "mpfam151" : "Yubo Bone"
  , "mpfam152" : "Yubo Skin"
  , "mpfam153" : "Zerx Bone"
  , "mpfam154" : "Zerx Claw"
  , "mpfam155" : "Zun Amber"
  , "mpfam162" : "Cratcha Leaf"
  , "mpfam163" : "Cratcha Pistil"
  , "mpfam164" : "Stinga Leaf"
  , "mpfam165" : "Stinga Pistil"
  , "mpfam166" : "Jubla Leaf"
  , "mpfam167" : "Jubla Pistil"
  , "mpfam168" : "Psykopla Leaf"
  , "mpfam169" : "Psykopla Pistil"
  , "mpfam170" : "Slaveni Leaf"
  , "mpfam171" : "Slaveni Pistil"
  , "mpfam172" : "Shooki Leaf"
  , "mpfam173" : "Shooki Pistil"
  , "mpfam174" : "Green Leaf"
  , "mpfam175" : "Dead Leaf"
  , "mpfam176" : "Rotting Leaf"
  , "mpfam177" : "Fresh Resin"
  , "mpfam178" : "Dry Resin"
  , "mpfam179" : "Fresh Wood"
  , "mpfam180" : "Dry Wood"
  , "mpfam181" : "Rotting Wood"
  , "mpfam182" : "Dry Wood Sawdust"
  , "mpfam183" : "Damp Wood Sawdust"
  , "mpfam184" : "Small Reed Leaf"
  , "mpfam185" : "Large Reed Leaf"
  , "mpfam186" : "Giant Reed Leaf"
  , "mpfam187" : "Small Thorn"
  , "mpfam188" : "Large Thorn"
  , "mpfam189" : "Giant Thorn"
  , "mpfam190" : "Fresh Bark"
  , "mpfam191" : "Dry Bark"
  , "mpfam192" : "Dry Straw"
  , "mpfam193" : "Damp Straw"
  , "mpfam194" : "Dust"
  , "mpfam195" : "Dry Fiber"
  , "mpfam196" : "Damp Fiber"
  , "mpfam197" : "Rotting Fiber"
  , "mpfam198" : "Small Pearly Shell"
  , "mpfam199" : "Large Pearly Shell"
  , "mpfam200" : "Giant Pearly Shell"
  , "mpfam201" : "Small Pearl"
  , "mpfam202" : "Large Pearl"
  , "mpfam203" : "Giant Pearl"
  , "mpfam204" : "Silvery Fish Scale"
  , "mpfam205" : "Golden Fish Scale"
  , "mpfam206" : "Living Parasite"
  , "mpfam207" : "Dead Parasite"
  , "mpfam208" : "Small Spider Web"
  , "mpfam209" : "Large Spider Web"
  , "mpfam210" : "Worm Silk"
  , "mpfam211" : "Spider Silk"
  , "mpfam212" : "Small Firefly Abdomen"
  , "mpfam213" : "Large Firefly Abdomen"
  , "mpfam214" : "Red Butterfly Wing"
  , "mpfam215" : "Green Butterfly Wing"
  , "mpfam216" : "Blue Butterfly Wing"
  , "mpfam217" : "Yellow Butterfly Wing"
  , "mpfam218" : "Fresh Wax"
  , "mpfam219" : "Dry Wax"
  , "mpfam220" : "Fresh Flower Petal"
  , "mpfam221" : "Dried Flower Petal"
  , "mpfam222" : "Small Bud"
  , "mpfam223" : "Large Bud"
  , "mpfam224" : "Fresh Moss"
  , "mpfam225" : "Dry Moss"
  , "mpfam226" : "Fresh Dandelion"
  , "mpfam227" : "Dried Dandelion"
  , "mpfam228" : "Blooming Dandelion"
  , "mpfam229" : "Small Reed Stem"
  , "mpfam230" : "Large Reed Stem"
  , "mpfam231" : "Fresh Loose Soil"
  , "mpfam232" : "Dried Loose Soil"
  , "mpfam233" : "Fresh Modified Sap"
  , "mpfam234" : "Dried Modified Sap"
  , "mpfam235" : "Small Insect Fossil"
  , "mpfam236" : "Large Insect Fossil"
  , "mpfam237" : "Small Plant Fossil"
  , "mpfam238" : "Large Plant Fossil"
  , "mpfam239" : "Red Pigment"
  , "mpfam240" : "Green Pigment"
  , "mpfam241" : "Blue Pigment"
  , "mpfam242" : "Yellow Pigment"
  , "mpfam243" : "Black Pigment"
  , "mpfam244" : "Fresh Goo Residue"
  , "mpfam245" : "Dried Goo Residue"
  , "mpfam246" : "Small Mushroom"
  , "mpfam247" : "Large Mushroom"
  , "mpfam248" : "Living Insect Larva"
  , "mpfam249" : "Fresh Cereal"
  , "mpfam250" : "Dried Cereal"
  , "mpfam251" : "Dead Insect Larva"
  , "mpfam252" : "Small Egg"
  , "mpfam253" : "Large Egg"
  , "mpfam254" : "Fresh Honey"
  , "mpfam255" : "Dried Honey"
  , "mpfam256" : "Peppery Aromatic Plant"
  , "mpfam257" : "Spicy Aromatic Plant"
  , "mpfam258" : "Bitter Aromatic Plant"
  , "mpfam259" : "Fresh Wild Berry"
  , "mpfam260" : "Dried Wild Berry"
  , "mpfam261" : "Small Fruit"
  , "mpfam262" : "Large Fruit"
  , "mpfam263" : "Mektoub Meat"
  , "mpfam264" : "Ragus Meat"
  , "mpfam265" : "Yubo Meat"
  , "mpfam266" : "Capryni Meat"
  , "mpfam267" : "Messab Meat"
  , "mpfam268" : "Cray Flesh"
  , "mpfam269" : "Igara Meat"
  , "mpfam270" : "Izam Meat"
  , "mpfam271" : "Yber Meat"
  , "mpfam272" : "Arma Meat"
  , "mpfam273" : "Bodoc Meat"
  , "mpfam274" : "Yelk Meat"
  , "mpfam275" : "Lumper Meat"
  , "mpfam276" : "Timari Meat"
  , "mpfam277" : "Kirosta Flesh"
  , "mpfam278" : "Kincher Flesh"
  , "mpfam279" : "Kipucka Flesh"
  , "mpfam280" : "Kiban Flesh"
  , "mpfam281" : "Kipee Flesh"
  , "mpfam282" : "Kizoar Flesh"
  , "mpfam283" : "Kipesta Flesh"
  , "mpfam284" : "Cute Skull"
  , "mpfam285" : "Gibba&#xF813;kull"
  , "mpfam286" : "Frahar Skull"
  , "mpfam287" : "Mektoub Blood"
  , "mpfam288" : "Gingo Blood"
  , "mpfam289" : "Ragus Blood"
  , "mpfam290" : "Yubo Blood"
  , "mpfam291" : "Kipee Blood"
  , "mpfam292" : "Kipucka Blood"
  , "mpfam293" : "Yelk Blood"
  , "mpfam294" : "Cray Blood"
  , "mpfam295" : "Gibba&#xF808;airs"
  , "mpfam296" : "Capryni Hairs"
  , "mpfam298" : "Gingo Hairs"
  , "mpfam299" : "Torbak Hairs"
  , "mpfam300" : "Ragus Hairs"
  , "mpfam302" : "Lumper Hairs"
  , "mpfam303" : "Zerx Hairs"
  , "mpfam304" : "Bodoc Hairs"
  , "mpfam305" : "Arma Hairs"
  , "mpfam306" : "Yubo Hairs"
  , "mpfam307" : "Cute Hairs"
  , "mpfam308" : "Goo Contaminated Meat"
  , "mpfam309" : "Fresh Kitin Cocoon"
  , "mpfam310" : "Old Kitin Cocoon"
  , "mpfam311" : "Kitin Saliva"
  , "mpfam312" : "Kitin Larva"
  , "mpfam313" : "Arma Skull"
  , "mpfam314" : "Bodoc Skull"
  , "mpfam315" : "Capryni Skull"
  , "mpfam316" : "Gingo Skull"
  , "mpfam317" : "Yubo Skull"
  , "mpfam318" : "Messab Skull"
  , "mpfam319" : "Torbak Skull"
  , "mpfam320" : "Lumper Skull"
  , "mpfam321" : "Igara Skull"
  , "mpfam322" : "Izam Skull"
  , "mpfam323" : "Mektoub Skull"
  , "mpfam324" : "Ragus Skull"
  , "mpfam325" : "Najab Skull"
  , "mpfam326" : "Timari Skull"
  , "mpfam327" : "Vorax Skull"
  , "mpfam328" : "Yelk Skull"
  , "mpfam329" : "Varinx Skull"
  , "mpfam330" : "Yber Skull"
  , "mpfam331" : "Zerx Skull"
  , "mpfam332" : "Frahar Skull"
  , "mpfam333" : "Torbak Tooth"
  , "mpfam334" : "Messab Bone"
  , "mpfam335" : "Javing Wing"
  , "mpfam336" : "Clopper Shell"
  , "mpfam337" : "Clopper Claw"
  , "mpfam338" : "Varinx Bone"
  , "mpfam339" : "Gingo Bone"
  , "mpfam340" : "Mektoub Bone"
  , "mpfam341" : "Cuttler Bone"
  , "mpfam342" : "Mektoub Tooth"
  , "mpfam343" : "Ragus Bone"
  , "mpfam344" : "Arma Bone"
  , "mpfam345" : "Timari Tooth"
  , "mpfam346" : "Ragus Fang"
  , "mpfam347" : "Gingo Fang"
  , "mpfam348" : "Cuttler Fang"
  , "mpfam349" : "Yetin Fang"
  , "mpfam350" : "Messab Tooth"
  , "mpfam351" : "Bolobi Bone"
  , "mpfam352" : "Rendor Claw"
  , "mpfam353" : "Wombai Bone"
  , "mpfam354" : "Javing Shell"
  , "mpfam355" : "Gnoof Bone"
  , "mpfam356" : "Zerx Fang"
  , "mpfam357" : "Raspal Bone"
  , "mpfam358" : "Goari Claw"
  , "mpfam359" : "Messab Nail"
  , "mpfam360" : "Bawaab Bone"
  , "mpfam361" : "Ploderos Shell"
  , "mpfam362" : "Rendor Shell"
  , "mpfam363" : "Wombai Skin"
  , "mpfam364" : "Bolobi Skin"
  , "mpfam365" : "Messab Skin"
  , "mpfam366" : "Yber Wing"
  , "mpfam367" : "Bawaab Skin"
  , "mpfam368" : "Horncher Shell"
  , "mpfam369" : "Najab Leather"
  , "mpfam370" : "Varinx Skin"
  , "mpfam371" : "Izam Leather"
  , "mpfam372" : "Igara Leather"
  , "mpfam373" : "Yber Skin"
  , "mpfam374" : "Bawaab Nail"
  , "mpfam375" : "Javing Tongue"
  , "mpfam376" : "Cuttler Leather"
  , "mpfam377" : "Lumper Nail"
  , "mpfam378" : "Messab Hoof"
  , "mpfam379" : "Wombai Leather"
  , "mpfam380" : "Frippo Skin"
  , "mpfam381" : "Madakam Horn"
  , "mpfam382" : "Arana Shell"
  , "mpfam383" : "Gubani Tooth"
  , "mpfam384" : "Ocyx Bone"
  , "mpfam385" : "Jugula Fang"
  , "mpfam386" : "Tyrancha Claw"
  , "mpfam387" : "Kidinak Claw"
  , "mpfam388" : "Kizarak Claw"
  , "mpfam389" : "Kinrey Claw"
  , "mpfam390" : "Vorax Claw"
  , "mpfam391" : "Shalah Tusk"
  , "mpfam392" : "System"
  , "mpfam393" : "Timari Meat"
  , "mpfam394" : "Raspal Meat"
  , "mpfam395" : "Bawaab Meat"
  , "mpfam396" : "Frippo Meat"
  , "mpfam397" : "Rendor Meat"
  , "mpfam398" : "Gnoof Meat"
  , "mpfam399" : "Bolobi Meat"
  , "mpfam400" : "Shalah Meat"
  , "mpfam401" : "Ploderos Meat"
  , "mpfam402" : "Wombai Meat"
  , "mpfam403" : "Madakam Meat"
  , "mpfam404" : "Arana Meat"
  , "mpfam405" : "Gubani Meat"
  , "mpfam406" : "Javing Meat"
  , "mpfam407" : "Cuttler Meat"
  , "mpfam408" : "Ocyx Meat"
  , "mpfam409" : "Jugula Meat"
  , "mpfam410" : "Horncher Flesh"
  , "mpfam411" : "Tyrancha Meat"
  , "mpfam412" : "Yetin Meat"
  , "mpfam413" : "Timari Skull"
  , "mpfam414" : "Raspal Skull"
  , "mpfam415" : "Bawaab Skull"
  , "mpfam416" : "Frippo Skull"
  , "mpfam417" : "Rendor Skull"
  , "mpfam418" : "Gnoof Skull"
  , "mpfam419" : "Bolobi Skull"
  , "mpfam420" : "Shalah Skull"
  , "mpfam421" : "Ploderos Skull"
  , "mpfam422" : "Wombai Skull"
  , "mpfam423" : "Madakam Skull"
  , "mpfam425" : "Gubani Skull"
  , "mpfam427" : "Cuttler Skull"
  , "mpfam428" : "Ocyx Skull"
  , "mpfam429" : "Jugula Skull"
  , "mpfam430" : "Horncher Skull"
  , "mpfam431" : "Tyrancha Skull"
  , "mpfam432" : "Yetin Skull"
  , "mpfam433" : "Timari Blood"
  , "mpfam434" : "Raspal Blood"
  , "mpfam435" : "Bawaab Blood"
  , "mpfam436" : "Frippo Blood"
  , "mpfam437" : "Rendor Blood"
  , "mpfam438" : "Gnoof Blood"
  , "mpfam439" : "Bolobi Blood"
  , "mpfam440" : "Shalah Blood"
  , "mpfam441" : "Ploderos Blood"
  , "mpfam442" : "Wombai Blood"
  , "mpfam443" : "Madakam Blood"
  , "mpfam444" : "Arana Blood"
  , "mpfam445" : "Gubani Blood"
  , "mpfam446" : "Javing Blood"
  , "mpfam447" : "Cuttler Blood"
  , "mpfam448" : "Ocyx Blood"
  , "mpfam449" : "Jugula Blood"
  , "mpfam450" : "Horncher Blood"
  , "mpfam451" : "Tyrancha Blood"
  , "mpfam452" : "Yetin Blood"
  , "mpfam453" : "Gnoof Hair"
  , "mpfam454" : "Bolobi Hair"
  , "mpfam455" : "Shalah Hair"
  , "mpfam456" : "Wombai Hair"
  , "mpfam457" : "Gubani Hair"
  , "mpfam458" : "Yetin Hair"
  , "mpfam459" : "Arana Moss"
  , "mpfam460" : "Clopper Flesh"
  , "mpfam461" : "Goari Flesh"
  , "mpfam462" : "Yber Bone"
  , "mpfam463" : "Vorax Leather"
  , "mpfam464" : "Vorax Bone"
  , "mpfam465" : "Vorax Fang"
  , "mpfam467" : "Ocyx Claw"
  , "mpfam468" : "Najab Claw"
  , "mpfam469" : "Arana Wood"
  , "mpfam470" : "Cray Shell"
  , "mpfam471" : "Madakam Skin"
  , "mpfam472" : "Jubla Bud"
  , "mpfam473" : "Stinga Bud"
  , "mpfam474" : "Psykopla Bud"
  , "mpfam475" : "Slaveni Bud"
  , "mpfam476" : "Cratcha Bud"
  , "mpfam477" : "Shooki Bud"
  , "mpfam479" : "Kinrey Shell"
  , "mpfam480" : "Kinrey Sting"
  , "mpfam481" : "Kinrey Mandible"
  , "mpfam482" : "Kinrey Ligament"
  , "mpfam483" : "Kinrey Acid"
  , "mpfam485" : "Kidinak Shell"
  , "mpfam486" : "Kidinak Sting"
  , "mpfam487" : "Kidinak Mandible"
  , "mpfam488" : "Kidinak Tail"
  , "mpfam490" : "Kizarak Shell"
  , "mpfam491" : "Kizarak Sting"
  , "mpfam492" : "Kizarak Mandible"
  , "mpfam493" : "Kizarak Abdomen"
  , "mpfam494" : "Kizarak Silk"
  , "mpfam495" : "Kizarak Leaf"
  , "mpfam496" : "Kipee Sting"
  , "mpfam497" : "Adriel Bark"
  , "mpfam498" : "Arana Eye"
  , "mpfam499" : "Arana Nail"
  , "mpfam500" : "Arana Pelvis"
  , "mpfam501" : "Arana Tooth"
  , "mpfam502" : "Arma Eye"
  , "mpfam503" : "Arma Skin"
  , "mpfam504" : "Arma Pelvis"
  , "mpfam505" : "Arma Tooth"
  , "mpfam506" : "Bawaab Eye"
  , "mpfam507" : "Bawaab Pelvis"
  , "mpfam508" : "Bawaab Tooth"
  , "mpfam509" : "Bodoc Eye"
  , "mpfam510" : "Bodoc Pelvis"
  , "mpfam511" : "Bodoc Tooth"
  , "mpfam512" : "Bolobi Eye"
  , "mpfam513" : "Bolobi Leather"
  , "mpfam514" : "Bolobi Nail"
  , "mpfam515" : "Bolobi Pelvis"
  , "mpfam516" : "Bolobi Tooth"
  , "mpfam517" : "Capryni Eye"
  , "mpfam518" : "Capryni Skin"
  , "mpfam519" : "Capryni Nail"
  , "mpfam520" : "Capryni Tooth"
  , "mpfam521" : "Clopper Mandible"
  , "mpfam522" : "Clopper Secretion"
  , "mpfam523" : "Clopper Sting"
  , "mpfam524" : "Clopper Tail"
  , "mpfam525" : "Cratcha Moss"
  , "mpfam526" : "Cray Claw"
  , "mpfam527" : "Cray Mandible"
  , "mpfam528" : "Cray Secretion"
  , "mpfam529" : "Cray Tail"
  , "mpfam530" : "Cuttler Claw"
  , "mpfam531" : "Cuttler Ligament"
  , "mpfam532" : "Cuttler Skin"
  , "mpfam533" : "Dante Sap"
  , "mpfam534" : "Dung Resin"
  , "mpfam535" : "Enola Sap"
  , "mpfam536" : "Frippo Eye"
  , "mpfam537" : "Frippo Leather"
  , "mpfam538" : "Frippo Nail"
  , "mpfam539" : "Frippo Pelvis"
  , "mpfam540" : "Frippo Tooth"
  , "mpfam541" : "Fung Resin"
  , "mpfam542" : "Gingo Ligament"
  , "mpfam543" : "Gnoof Eye"
  , "mpfam544" : "Gnoof Skin"
  , "mpfam545" : "Gnoof Nail"
  , "mpfam546" : "Gnoof Pelvis"
  , "mpfam547" : "Gnoof Trunck"
  , "mpfam548" : "Goari Mandible"
  , "mpfam549" : "Goari Secretion"
  , "mpfam550" : "Goari Sting"
  , "mpfam551" : "Goari Tail"
  , "mpfam552" : "Gubani Eye"
  , "mpfam553" : "Gubani Skin"
  , "mpfam554" : "Gubani Nail"
  , "mpfam555" : "Gubani Pelvis"
  , "mpfam556" : "Horncher Mandible"
  , "mpfam557" : "Horncher Secretion"
  , "mpfam558" : "Horncher Sting"
  , "mpfam559" : "Horncher Tail"
  , "mpfam560" : "Igara Beak"
  , "mpfam561" : "Igara Bone"
  , "mpfam562" : "Igara Ligament"
  , "mpfam563" : "Igara Skin"
  , "mpfam564" : "Igara Wing"
  , "mpfam565" : "Irin Oil"
  , "mpfam566" : "Izam Beak"
  , "mpfam567" : "Izam Bone"
  , "mpfam568" : "Izam Ligament"
  , "mpfam569" : "Izam Skin"
  , "mpfam570" : "Izam Wing"
  , "mpfam571" : "Javing Beak"
  , "mpfam572" : "Javing Bone"
  , "mpfam573" : "Javing Ligament"
  , "mpfam574" : "Javing Leather"
  , "mpfam575" : "Jubla Moss"
  , "mpfam576" : "Jugula Bone"
  , "mpfam577" : "Jugula Claw"
  , "mpfam578" : "Jugula Ligament"
  , "mpfam579" : "Jugula Leather"
  , "mpfam580" : "Kiban Mandible"
  , "mpfam581" : "Kiban Secretion"
  , "mpfam582" : "Kiban Sting"
  , "mpfam583" : "Kiban Tail"
  , "mpfam584" : "Kidinak Secretion"
  , "mpfam585" : "Kincher Mandible"
  , "mpfam586" : "Kincher Secretion"
  , "mpfam587" : "Kincher Tail"
  , "mpfam588" : "Kinrey Secretion"
  , "mpfam589" : "Kinrey Tail"
  , "mpfam590" : "Kipee Mandible"
  , "mpfam591" : "Kipee Secretion"
  , "mpfam592" : "Kipee Tail"
  , "mpfam593" : "Kipesta Mandible"
  , "mpfam594" : "Kipesta Sting"
  , "mpfam595" : "Kipesta Tail"
  , "mpfam596" : "Kipesta Wing"
  , "mpfam597" : "Kipucka Claw"
  , "mpfam598" : "Kipucka Mandible"
  , "mpfam599" : "Kipucka Secretion"
  , "mpfam600" : "Kirosta Mandible"
  , "mpfam601" : "Kirosta Secretion"
  , "mpfam602" : "Kirosta Shell"
  , "mpfam603" : "Kirosta Tail"
  , "mpfam604" : "Kizarak Secretion"
  , "mpfam605" : "Kizarak Tail"
  , "mpfam606" : "Kizoar Mandible"
  , "mpfam607" : "Kizoar Shell"
  , "mpfam608" : "Kizoar Sting"
  , "mpfam609" : "Kizoar Wing"
  , "mpfam610" : "Koorin Oil"
  , "mpfam611" : "Lumper Eye"
  , "mpfam612" : "Lumper Pelvis"
  , "mpfam613" : "Madakam Eye"
  , "mpfam614" : "Madakam Leather"
  , "mpfam615" : "Madakam Nail"
  , "mpfam616" : "Madakam Pelvis"
  , "mpfam617" : "Madakam Tooth"
  , "mpfam618" : "Mektoub Eye"
  , "mpfam619" : "Mektoub Nail"
  , "mpfam620" : "Mektoub Pelvis"
  , "mpfam621" : "Messab Eye"
  , "mpfam623" : "Mitexi Bark"
  , "mpfam624" : "Moon Resin"
  , "mpfam625" : "Najab Bone"
  , "mpfam626" : "Najab Fang"
  , "mpfam627" : "Najab Ligament"
  , "mpfam628" : "Najab Skin"
  , "mpfam629" : "Nita Wood Node"
  , "mpfam630" : "Oath Bark"
  , "mpfam632" : "Ocyx Fang"
  , "mpfam633" : "Ocyx Ligament"
  , "mpfam634" : "Ocyx Shell"
  , "mpfam635" : "Ploderos Eye"
  , "mpfam636" : "Ploderos Skin"
  , "mpfam637" : "Ploderos Nail"
  , "mpfam638" : "Ploderos Pelvis"
  , "mpfam639" : "Ploderos Tooth"
  , "mpfam640" : "Psykopla Moss"
  , "mpfam641" : "Ragus Ligament"
  , "mpfam642" : "Raspal Eye"
  , "mpfam643" : "Raspal Skin"
  , "mpfam644" : "Raspal Nail"
  , "mpfam645" : "Raspal Pelvis"
  , "mpfam646" : "Raspal Tooth"
  , "mpfam647" : "Rendor Eye"
  , "mpfam648" : "Rendor Skin"
  , "mpfam649" : "Rendor Nail"
  , "mpfam650" : "Rendor Pelvis"
  , "mpfam651" : "Rendor Tooth"
  , "mpfam652" : "Scrath Wood Node"
  , "mpfam653" : "Shalah Eye"
  , "mpfam654" : "Shalah Skin"
  , "mpfam655" : "Shalah Nail"
  , "mpfam656" : "Shalah Pelvis"
  , "mpfam657" : "Shalah Tooth"
  , "mpfam658" : "Shooki Moss"
  , "mpfam659" : "Silvio Seed"
  , "mpfam660" : "Slaveni Moss"
  , "mpfam661" : "Stinga Moss"
  , "mpfam662" : "Tansy Wood Node"
  , "mpfam663" : "Timari Eye"
  , "mpfam664" : "Timari Nail"
  , "mpfam665" : "Timari Pelvis"
  , "mpfam666" : "Torbak Ligament"
  , "mpfam667" : "Tyrancha Bone"
  , "mpfam668" : "Tyrancha Fang"
  , "mpfam669" : "Tyrancha Ligament"
  , "mpfam670" : "Tyrancha Leather"
  , "mpfam671" : "Varinx Claw"
  , "mpfam672" : "Varinx Ligament"
  , "mpfam673" : "Vorax Ligament"
  , "mpfam674" : "Vorax Skin"
  , "mpfam675" : "Wombai Eye"
  , "mpfam676" : "Wombai Pelvis"
  , "mpfam677" : "Wombai Spine"
  , "mpfam678" : "Wombai Trunck"
  , "mpfam679" : "Yana Wood Node"
  , "mpfam680" : "Yber Beak"
  , "mpfam681" : "Yber Ligament"
  , "mpfam682" : "Yelk Skin"
  , "mpfam683" : "Yelk Pelvis"
  , "mpfam684" : "Yetin Bone"
  , "mpfam685" : "Yetin Claw"
  , "mpfam686" : "Yetin Ligament"
  , "mpfam687" : "Yetin Leather"
  , "mpfam688" : "Yubo Eye"
  , "mpfam689" : "Yubo Leather"
  , "mpfam690" : "Yubo Nail"
  , "mpfam691" : "Yubo Pelvis"
  , "mpfam692" : "Yubo Tooth"
  , "mpfam693" : "Zerx Ligament"
  , "mpfam694" : "Zerx Leather"
  , "mpfam695" : "Kitin Claw"
  , "mpfam696" : "Primitive Necklace"
  , "mpfam697" : "Atrium"
  , "mpfam698" : "Matis Order Form"
  , "mpfam699" : "Fyros Order Form"
  , "mpfam700" : "Zorai Order Form"
  , "mpfam701" : "Tryker Order Form"
  , "mpfam702" : "Matis Military Package"
  , "mpfam703" : "Fyros Military Package"
  , "mpfam704" : "Zorai Military Package"
  , "mpfam705" : "Tryker Military Package"
  , "mpfam706" : "Matis Royal Token"
  , "mpfam707" : "Fyros Imperial Token"
  , "mpfam708" : "Zorai Cho Token"
  , "mpfam709" : "Tryker Federation Token"
  , "mpfam710" : "Goo Part"
  , "mpfam711" : "Goo Nodule"
  , "mpfam712" : "Nano Builders"
  , "mpfam713" : "Kami Merit Badge"
  , "mpfam714" : "Karavan Merit Badge"
  , "mpfam715" : "Sap Power Kristal"
  , "mpfam716" : "Kitin Egg"
  , "mpfam717" : "Aelius Shell"
  , "mpfam718" : "Aelius Resin"
  , "mpfam719" : "Aelius Wood"
  , "mpfam720" : "Olkern Fiber"
  , "mpfam721" : "Olkern Resin"
  , "mpfam722" : "Olkern Bark"
  , "mpfam723" : "Almati Shell"
  , "mpfam724" : "Almati Resin"
  , "mpfam725" : "Almati Wood Node"
  , "mpfam726" : "Almati Wood"
  , "mpfam727" : "Crystallized Sap"
  , "mpfam728" : "Stellar Amber"
  , "mpfam729" : "Refined Aelius Shell"
  , "mpfam730" : "Refined Aelius Resin"
  , "mpfam731" : "Refined Aelius Wood"
  , "mpfam732" : "Refined Olkern Fiber"
  , "mpfam733" : "Refined Olkern Resin"
  , "mpfam734" : "Refined Olkern Bark"
  , "mpfam735" : "Refined Almati Shell"
  , "mpfam736" : "Refined Almati Resin"
  , "mpfam737" : "Refined Almati Wood Node"
  , "mpfam738" : "Refined Almati Wood"
  , "mpfam739" : "Refined Crystallized Sap"
  , "mpfam740" : "Refined Stellar Amber"
  , "mpfam741" : "Modified Tekorn Bramble"
  , "mpfam742" : "Modified Maga Liana"
  , "mpfam743" : "Modified Armilo Lichen"
  , "mpfam744" : "Modified Greslin Strand"
  , "mpfam745" : "Purificated Tekorn Bramble"
  , "mpfam746" : "Purificated Maga Liana"
  , "mpfam747" : "Purificated Armilo Lichen"
  , "mpfam748" : "Purificated Greslin Strand"
  , "mpfam749" : "Modified Vedic Juice"
  , "mpfam750" : "Modified Cheng Root"
  , "mpfam751" : "Modified Rubbarn Gum"
  , "mpfam752" : "Modified Egiros Pollen"
  , "mpfam753" : "Purificated Vedice Juice"
  , "mpfam754" : "Purificated Cheng Root"
  , "mpfam755" : "Purificated Rubbarn Gum"
  , "mpfam756" : "Purificated Egiros Pollen"
  , "mpfam757" : "corrupted jugula skin"
  , "mpfam758" : "corrupted gingo fur"
  , "mpfam759" : "corrupted igara skin"
  , "mpfam760" : "corrupted psykopla moss"
  , "mpfam761" : "corrupted torbak skin"
  , "mpfam762" : "corrupted kinrey silk"
  , "mpfam763" : "corrupted cratcha leaf"
  , "mpfam764" : "corrupted kizoar silk"
  , "mpfam765" : "grand mugul skin"
  , "mpfam766" : "corrupted kipesta sack"
  , "mpfam767" : "corrupted jubla bud"
  , "mpfam768" : "corrupted kincher carapace"
  , "mpfam769" : "corrupted kipucka flesh"
  , "mpfam770" : "corrupted kidinak sting"
  , "mpfam771" : "corrupted goari pincer"
  , "mpfam772" : "corrupted varinx tooth"
  , "mpfam773" : "corrupted kipucka sting"
  , "mpfam774" : "kitin boss sting"
  , "mpfam775" : "corrupted yelk carapace"
  , "mpfam776" : "corrupted kinrey head"
  , "mpfam777" : "corrupted kincher head"
  , "mpfam778" : "corrupted vorax jaw"
  , "mpfam779" : "corrupted yber bone"
  , "mpfam780" : "corrupted kidinak mandible"
  , "mpfam781" : "corrupted timari crest"
  , "mpfam782" : "corrupted najab tail"
  , "mpfam783" : "corrupted ragus tooth"
  , "mpfam784" : "corrupted kipesta mandible"
  , "mpfam785" : "corrupted clopper carapace"
  , "mpfam786" : "corrupted kizoar sting"
  , "mpfam787" : "corrupted cray head"
  , "mpfam789" : "corrupted dark resin"
  , "mpfam790" : "corrupted bright wood"
  , "mpfam791" : "corrupted heavy bark"
  , "mpfam792" : "corrupted light shell"
  , "mpfam793" : "corrupted thick amber"
  , "mpfam794" : "corrupted dark wood"
  , "mpfam795" : "corrupted unstable oil"
  , "mpfam796" : "corrupted solid amber"
  , "mpfam797" : "Kitins'Lair Deposit 01"
  , "mpfam798" : "Kitins'Lair Deposit 02"
  , "mpfam799" : "Kitins'Lair Deposit 03"
  , "mpfam800" : "Kitins'Lair Deposit 04"
  , "mpfam801" : "Kitins'Lair Deposit 05"
  , "mpfam802" : "TODO : peau souple de la reine"
  , "mpfam803" : "TODO : ecailles fines de la reine"
  , "mpfam804" : "TODO : petites griffes de la reine"
  , "mpfam805" : "TODO : cuir flexible de la reine"
  , "mpfam806" : "TODO : cuir brut de la reine"
  , "mpfam807" : "TODO : soie fine de la reine"
  , "mpfam808" : "TODO : ecailles rigides de la reine"
  , "mpfam809" : "TODO : peau &#x9C21;isse de la reine"
  , "mpfam810" : "TODO : ligaments denses de la reine"
  , "mpfam811" : "TODO : griffes puissantes de la reine"
  , "mpfam812" : "TODO : soie robuste de la reine"
  , "mpfam813" : "TODO : carapace la reine"
  , "mpfam814" : "TODO : peau &#x9C21;isse de la reine"
  , "mpfam815" : "Marauders' Crystal"
  , "mpfam816" : "Lixie's Crystal"
  , "mpfam817" : "Sirgio's Crystal"
  , "mpfam818" : "Pen's Crystal"
  , "mpfam819" : "Marauders' Crystal"
};

translation["de"] =
{
    "uiLanguageName" : "Deutsch"
  , "uiSlotsTitle" : "Slots ausw�hlen"
  , "uiCraftWindowTitle" : "Das Crafting Fenster"
  , "uiItemListTitle" : "Die verwendeten Gegenst�nde"
  , "uiPreviewTitle" : "Werte Vorschau"
  , "uiSelectQuantity" : "Anzahl ausw�hlen"
  , "uiSheetID" : "SheetID"
  , "uiQuality" : "Qualit�t"
  , "uiFamily" : "Familie"
  , "uiColor" : "Farbe"
  , "uiEcosystem" : "�kosystem"
  
};

translation["fr"] =
{
    "uiLanguageName" : "Fran�ais"
};

