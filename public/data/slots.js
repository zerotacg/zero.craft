var TSlot =
{
    "BLADE"           : 0x00
  , "HAMMER"          : 0x01
  , "POINT"           : 0x02
  , "SHAFT"           : 0x03
  , "GRIP"            : 0x04
  , "COUNTERWEIGHT"   : 0x05
  , "TRIGGER"         : 0x06
  , "FIRING_PIN"      : 0x07
  , "BARREL"          : 0x08
  , "EXPLOSIVE"       : 0x09
  , "AMMO_JACKET"     : 0x0A
  , "AMMO_BULLET"     : 0x0B
  , "ARMOUR_SHELL"    : 0x0C
  , "LINING"          : 0x0D
  , "STUFFING"        : 0x0E
  , "ARMOUR_CLIP"     : 0x0F
  , "JEWEL_SETTING"   : 0x10
  , "JEWEL"           : 0x11
  , "BLACKSMITH_TOOL" : 0x12
  , "PESTLE_TOOL"     : 0x13
  , "SHARPENER_TOOL"  : 0x14
  , "TUNNELING_KNIFE" : 0x15
  , "JEWLERY_HAMMER"  : 0x16
  , "CAMPFIRE"        : 0x17
  , "CLOTHES"         : 0x18
  , "MAGIC_FOCUS"     : 0x19
};
addNameValues(TSlot);

var TSlotFlag =
{
    "BLADE"           : 0x00000001
  , "HAMMER"          : 0x00000002
  , "POINT"           : 0x00000004
  , "SHAFT"           : 0x00000008
  , "GRIP"            : 0x00000010
  , "COUNTERWEIGHT"   : 0x00000020
  , "TRIGGER"         : 0x00000040
  , "FIRING_PIN"      : 0x00000080
  , "BARREL"          : 0x00000100
  , "EXPLOSIVE"       : 0x00000200
  , "AMMO_JACKET"     : 0x00000400
  , "AMMO_BULLET"     : 0x00000800
  , "ARMOUR_SHELL"    : 0x00001000
  , "LINING"          : 0x00002000
  , "STUFFING"        : 0x00004000
  , "ARMOUR_CLIP"     : 0x00008000
  , "JEWEL_SETTING"   : 0x00010000
  , "JEWEL"           : 0x00020000
  , "BLACKSMITH_TOOL" : 0x00040000
  , "PESTLE_TOOL"     : 0x00080000
  , "SHARPENER_TOOL"  : 0x00100000
  , "TUNNELING_KNIFE" : 0x00200000
  , "JEWLERY_HAMMER"  : 0x00400000
  , "CAMPFIRE"        : 0x00800000
  , "CLOTHES"         : 0x01000000
  , "MAGIC_FOCUS"     : 0x02000000
};
addNameValues(TSlot);

var Slots =
{
    0x00 :
    {
        "icon"  : "ico_blade"
      , "label" : "mpftMpL"
      , "stat"  : [0, 1, 2, 3, 4, 6, 7, 8, 9]
    }
  , 0x01 :
    {
        "icon"  : "ico_hammer"
      , "label" : "mpftMpH"
      , "stat"  : [0, 1, 2, 3, 4, 6, 7, 8, 9]
    }
  , 0x02 :
    {
        "icon"  : "ico_pointe"
      , "label" : "mpftMpP"
      , "stat"  : [0, 1, 2, 3, 4, 6, 7, 8, 9]
    }
  , 0x03 :
    {
        "icon"  : "ico_shaft"
      , "label" : "mpftMpM"
      , "stat"  : [0, 1, 2, 3, 4, 6, 7, 8, 9]
    }
  , 0x04 :
    {
        "icon"  : "ico_gripp"
      , "label" : "mpftMpG"
      , "stat"  : [0, 1, 2, 4, 6, 7, 8, 9]
    }
  , 0x05 :
    {
        "icon"  : "ico_counterweight"
      , "label" : "mpftMpC"
      , "stat"  : [0, 1, 2, 4, 6, 7, 8, 9]
    }
  , 0x06 :
    {
        "icon"  : "ico_trigger"
      , "label" : "mpftMpGA"
      , "stat"  : [0, 1, 2, 4, 6, 7, 8, 9]
    }
  , 0x07 :
    {
        "icon"  : "ico_firing_pin"
      , "label" : "mpftMpPE"
      , "stat"  : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  , 0x08 :
    {
        "icon"  : "ico_barrel"
      , "label" : "mpftMpCA"
      , "stat"  : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  , 0x09 :
    {
        "icon"  : "ico_explosif"
      , "label" : "mpftMpE"
      , "stat"  : [0, 1, 3, 4, 5]
    }
  , 0x0A :
    {
        "icon"  : "ico_ammo_jacket"
      , "label" : "mpftMpEN"
      , "stat"  : [0, 1, 4, 5]
    }
  , 0x0B :
    {
        "icon"  : "ico_ammo_bullet"
      , "label" : "mpftMpPR"
      , "stat"  : [0, 1, 3, 4, 5]
    }
  , 0x0C :
    {
        "icon"  : "ico_armor_shell"
      , "label" : "mpftMpCR"
      , "stat"  : [0, 1, 6, 7, 10, 11, 12, 13]
    }
  , 0x0D :
    {
        "icon"  : "ico_lining"
      , "label" : "mpftMpRI"
      , "stat"  : [0, 1, 6, 7, 10, 11, 12, 13]
    }
  , 0x0E :
    {
        "icon"  : "ico_stuffing"
      , "label" : "mpftMpRE"
      , "stat"  : [0, 1, 6, 7, 10, 11, 12, 13]
    }
  , 0x0F :
    {
        "icon"  : "ico_armor_clip"
      , "label" : "mpftMpAT"
      , "stat"  : [0, 1, 6, 7, 10, 11, 12, 13]
    }
  , 0x10 :
    {
        "icon"  : "ico_jewel_stone_support"
      , "label" : "mpftMpSU"
      , "stat"  : [0, 1, 21, 22, 23, 24, 25]
    }
  , 0x11 :
    {
        "icon"  : "ico_jewel_stone"
      , "label" : "mpftMpED"
      , "stat"  : [0, 1, 14, 15, 16, 17, 18, 19, 20]
    }
  , 0x18 :
    {
        "icon"  : "ico_clothes"
      , "label" : "mpftMpVE"
      , "stat"  : [0, 1, 6, 7, 10, 11, 12, 13]
    }
  , 0x19 :
    {
        "icon"  : "ico_magic_focus"
      , "label" : "mpftMpMF"
      , "stat"  : [0, 1, 2, 26, 27, 28, 29, 30, 31, 32, 33]
    }
};
