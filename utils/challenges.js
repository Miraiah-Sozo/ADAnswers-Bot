/* eslint-disable max-len */
"use strict";

const base = ` It is recommended to have at least the first 12 infinity upgrades and 100 spare IP.
 If you want to get those 100 IP, you probably want to get upgrade 13 and 14 as well to speed things up. (Note: Those upgrades won't work inside challenges.)`;

const icBase = (ic, ip) => `Attempt IC${ic} at ~e${ip} IP. No special strat for this challenge.`;

const challenges = {
  "c2": {
    number: 2,
    requirements: `Reach Infinity`,
    challenge: `Buying anything halts your production, gradually coming back over 3 minutes.`,
    strategy: `${base}\n After all, holding M is detrimental. Press it once you can get a few dimensions.`,
    reward: `2nd Antimatter Dimension autobuyer`,
    goal: `Reach Infinity under these circumstances`,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980907127730233425/C2.png`
  },
  "c3": {
    number: 3,
    requirements: `Reach Infinity`,
    challenge: `The 1st Antimatter Dimension is heavily weakened, but gets an exponentially increasing bonus that resets after DImension Boosts and Antimatter Galaxies.`,
    strategy: base,
    reward: `3rd Antimatter Dimension autobuyer`,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980907128040591410/C3.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c4": {
    number: 4,
    requirements: `Reach Infinity`,
    challenge: `Buying an Antimatter Dimension automatically erases all lower tier Antimatter Dimensions, like a sacrifice without the boost.`,
    strategy: base,
    reward: `4th Antimatter Dimension autobuyer`,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980907128254496858/C4.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c5": {
    number: 5,
    requirements: `Reach Infinity`,
    challenge: `Web: Tickspeed starts at 7%.\n
                  Mobile: The Tickspeed purchase multiplier starts at ×1.080 instead of ×1.125.`,
    strategy: base,
    reward: `5th Antimatter Dimension autobuyer`,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980908583430533120/C5.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c6": {
    number: 6,
    requirements: `Reach Infinity`,
    challenge: `Each Antimatter Dimension costs the dimension 2 dimensions below it, instead of antimatter. Antimatter Dimension prices are modified.`,
    strategy: base,
    reward: `6th Antimatter Dimension autobuyer`,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980908583623483452/C6.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c7": {
    number: 7,
    requirements: `Reach Infinity`,
    challenge: `Web: \n
                  Mobile: The multiplier from buying 10 Antimatter Dimensions is reduced to ×1, but is increased by ×0.2 per Dimension Boost, up to a maximum of ×2.`,
    strategy: base,
    reward: `7th Antimatter Dimension autobuyer`,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980908583841595422/C7.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c8": {
    number: 8,
    requirements: `Reach Infinity`,
    challenge: `Dimension Boosts provide no boost and Antimatter Galaxies cannot be bought, but Dimensional Sacrifice is significantly stronger and resets antimatter and all Antimatter Dimensions.`,
    strategy: `No strat or tips for this challenge. Just start it, get five dimboosts (four shifts and one boost on web) and hit sacrifice at ~10x.
      Make sure to do the antitable achievement in these runs, because this achievement is pretty easy for now. If you need a guide for it, feel free to call the bot with "/antitables prebreak".`,
    reward: `8th Antimatter Dimension autobuyer`,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980908584101609472/C8.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c9": {
    number: 9,
    requirements: `Reach Infinity`,
    challenge: `Whenever you buy Tickspeed upgrades, or 10 of an Antimatter Dimension, everything else of equal cost will increase to its next cost step.`,
    strategy: `I recommend having all Infinity upgrades (except the last 4 which don't work in challenges) and at least 100 unspent IP before attempting C9. Some players prefer attempting this challenge at higher IP values (10k+) where the challenge becomes trivial.\n
      You can use this written guide: <https://pastebin.com/MBBTimjD> or this video guide: <https://youtu.be/6o-QKHLcimU> or you can use this strat: 
      > Autobuyers off and manually buy the highest dimension available. Keep 6th dim, 8th dim, dimboost, and galaxy autobuyers on. Keep tickspeed cost under the cost of dimensions. Remember to always buy 8th dimension if it's available.`,
    reward: `Tickspeed Autobuyer`,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980908584332308490/C9.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c10": {
    number: 10,
    requirements: `Reach Infinity`,
    challenge: `There are only 6 Antimatter Dimensions, with Dimension Boost and Antimatter Galaxy costs modified.`,
    strategy: base,
    reward: "Dimension Boost autobuyer",
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980908584546230292/C10.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c11": {
    number: 11,
    requirements: `Reach Infinity`,
    challenge: `There's normal matter which rises once you have at least 1 2nd Antimatter Dimension. If it exceeds your antimatter, it will Dimension Boost without giving the bonus.`,
    strategy: `${base}\n If you are on web, this challenge becomes a normal infinity run once you have the "Galaxies are twice as effective" upgrade. Just do it once you have that upgrade.`,
    reward: "Antimatter Galaxy autobuyer",
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980908584919531541/C11.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c12": {
    number: 12,
    requirements: `Reach Infinity`,
    challenge: `Each Antimatter Dimension produces the dimension 2 dimensions below it (1st Antimatter Dimensions still produce antimatter). The 2nd, 4th, and 6th Antimatter Dimensions are made stronger to compensate.`,
    strategy: `It is recommended to have at least the first 12 Infinity Upgrades and ~200 Infinities. Spare IP is not important for C12.
      If you want to get those 200 Infinities, you probably want to get upgrades 13 to 15 as well to speed things up. (Note: Those upgrades won't work inside challenges.)
      The exact number of infinities could be arugued, but 200 was relatively reasonable to Tables -- who completed C12 in 5 minutes with 200 Infinities and 0 Infinity Points.`,
    reward: "Big Crunches autobuyer",
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980908585162784778/C12.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "ic1": {
    number: 1,
    requirements: `Reach **1e2000** antimatter`,
    challenge: `All Normal Challenges, with the exception of Tickspeed (C9) and Big Crunch (C11) Challenges, are active at the same time.`,
    goal: `Web: Reach **1e850** antimatter
      Mobile: Reach **1e650** antimatter`,
    strategy: `As the reward of IC1 is not that good, it's recommended to do it once you have the galaxy upgrade for 5e11 IP. No special strat for this challenge.`,
    reward: `×1.3 on all Infinity Dimensions for each Infinity Challenge completed`,
    rewardFormula: `\`1.3 ^ ICs completed\` (to a max of ×8.2)`,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980928603309109358/IC1.png`,
  },
  "ic2": {
    number: 2,
    requirements: `Reach **1e11000** antimatter`,
    challenge: `Automatically Dimensional Sacrifice every 400 milliseconds once you have an 8th Antimatter Dimension.`,
    goal: `Reach **1e10500** antimatter`,
    strategy: `Do not attempt IC2 before you reached ID4 at ~e45 IP. If you cannot get e10500 AM in a normal infinity, why would you try to reach it inside a challenge? No special strat for this challenge.`,
    reward: `Dimensional Sacrifice autobuyer and stronger Dimensional Sacrifice`,
    rewardFormula: `\`(log10(AD1)/10)^2.6\` to \`AD1^0.011\``,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980928603569135718/IC2.png`,
  },
  "ic3": {
    number: 3,
    requirements: `Reach **1e12000** antimatter`,
    challenge: `Tickspeed upgrades are always ×1. For every Tickspeed upgrade purchase, you instead get a static multiplier on all Antimatter Dimensions which increases based on Antimatter Galaxies.`,
    goal: `Reach **1e5000** antimatter`,
    strategy: `Attempt IC3 after getting the ID1 for e56 IP. This might take an hour to do. No special strat for this challenge.`,
    reward: `Antimatter Dimension multiplier based on Antimatter Galaxies and Tickspeed purchases`,
    rewardFormula: `\`(1.05 + (galaxies * 0.005)) ^ tickspeed upgrade bought\``,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980928603795644426/IC3.png`,
  },
  "ic4": {
    number: 4,
    requirements: `Reach **1e14000** antimatter`,
    challenge: `Only the latest bought Antimatter Dimension's production is normal, all other Antimatter Dimensions produce less (^0.25).`,
    goal: `Reach **1e13000** antimatter`,
    strategy: `You can attempt IC4 at e68+ IP.

    **Before challenge:**
    - set Sacrifice autobuyer to 1e30x 
    - set Dimboost limit (or "Max 8ths used on reset" on web) to 4
    - set "Galaxies required to always Dimboost" to 100
    - disable Dimension autobuyers 1-7
    - keep Dimension 8, Tickspeed, Dimboost, and Galaxy autobuyers enabled
    
    **In challenge:**
    - hold M/Max until you get stuck
    - press "lose a dimboost"/"lose a reset"
    - press M/Max once (don't hold it, just press)
    - repeatedly buy dimensions 7->1 until you reach the next Galaxy
    - repeat
    
    **After challenge:**
    - set Sacrifice autobuyer back to 2x 
    - enable Dimension autobuyers 1-7
    
    Video guide: <https://youtu.be/lI70hBlpaqc>`,
    reward: `All Antimatter Dimension multipliers become multiplier^1.05`,
    rewardFormula: `\`multiplier ^ 1.05\``,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980928603996946542/IC4.png`,
  },
  "ic5": {
    number: 5,
    requirements: `Reach **1e18000** antimatter`,
    challenge: `Buying Antimatter Dimensions 1-4 causes all smaller Antimatter Dimension costs to increase, and buying Antimatter Dimensions 5-8 causes all larger Antimatter Dimension costs to increase.`,
    goal: `Web: Reach **1e11111** antimatter
    Mobile: Reach **1e16500** antimatter`,
    strategy: `**On Android, all you have to do is set Antimatter Dimension autobuyers 1-7 to "Buy Singles". Then just wait.**
    The written guide is based on the web version while the video was made on the android one. **The video can be found at the bottom of the written guide.** The strategy for IC5 is the same. Just keep in mind that you need 21 galaxies on web and around 40 galaxies on mobile to complete the challenge. Get at least e83 IP before attempting the challenge.
    Check out the Post-Eternity guide once you are past Eternity. The old guides still apply, however the Post-Eternity one is just specifically made with the Eternity progression in mind.
    IC5 written guide: <https://pastebin.com/sj2nFFjH>
    Post-Eternity guide (has Eternity spoilers!): ||https://cdn.discordapp.com/attachments/536249899487068181/848926013869522994/SVID_20200120_131504_1.mp4||`,
    reward: `All Galaxies are 10% stronger and reduce the requirements for them and Dimension Boosts by 1`,
    rewardFormula: `Think really hard`,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980928604277997599/IC5.png`,
  },
  "ic6": {
    number: 6,
    requirements: `Reach **1e22500** antimatter`,
    challenge: `Once you have at least 1 2nd Antimatter Dimension, exponentially rising matter divides the multiplier on all of your Antimatter Dimensions.`,
    goal: `Reach **2e22222** antimatter`,
    strategy: icBase(6, 102),
    reward: `Infinity Dimension multiplier based on tickspeed`,
    rewardFormula: `\`Tickspeed per second ^ 0.0005\``,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980928604621905970/IC6.png`,
  },
  "ic7": {
    number: 7,
    requirements: `Reach **1e23000** antimatter`,
    challenge: `You can't get Antimatter Galaxies, but Dimension Boost multiplier ×2.5 ➜ ×10`,
    goal: `Reach **1e10000** antimatter`,
    strategy: icBase(7, 114),
    reward: `Dimension Boost multiplier ×2.5 ➜ ×4`,
    rewardFormula: `\`×2.5\` to \`×4\``,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980928604856803338/IC7.png`,
  },
  "ic8": {
    number: 8,
    requirements: `Reach **1e28000** antimatter`,
    challenge: `Your production is at 100% after purchasing anything, after that it rapidly drops down.`,
    goal: `Reach **1e27000** antimatter`,
    strategy: icBase(8, 129),
    reward: `You get a multiplier to Antimatter Dimensions 2-7 based on 1st and 8th Antimatter Dimension multipliers.`,
    rewardFormula: `\`(AD1 multiplier * AD8 multiplier) ^ 0.02\``,
    image: `https://cdn.discordapp.com/attachments/824678601160917003/980928605091659856/IC8.png`,
  }
};

module.exports = { challenges };