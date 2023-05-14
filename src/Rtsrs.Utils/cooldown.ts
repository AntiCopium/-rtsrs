export class CooldownManager {
    cooldowns: Map<string, number>;
  
    constructor() {
      this.cooldowns = new Map();
    }
  
    setCooldown(userId: string, commandName: string, cooldownTime: number) {
      const cooldownKey = `${userId}-${commandName}`;
      const expirationTime = Date.now() + cooldownTime * 1000;
      this.cooldowns.set(cooldownKey, expirationTime);
    }
  
    isOnCooldown(userId: string, commandName: string): boolean {
      const cooldownKey = `${userId}-${commandName}`;
      const expirationTime = this.cooldowns.get(cooldownKey);
      return expirationTime !== undefined && Date.now() < expirationTime;
    }
  }
  