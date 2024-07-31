/**
 * Clase abstracta para los distintos servicios
 */
abstract class Service {
  basePrice: number;
  isPremium: boolean;
  additionalFee: number;

  constructor(basePrice: number, isPremium: boolean, additionalFee: number) {
    this.basePrice = basePrice;
    this.isPremium = isPremium;
    this.additionalFee = additionalFee;
  }

  /**
   * Método abstracto para obtener el coste de los servicios
   */
  abstract getCost(): number;
}

/**
 * Clase para los servicios en línea
 */
class StreamingService extends Service {
  constructor(basePrice: number, isPremium: boolean, additionalFee: number) {
    super(basePrice, isPremium, additionalFee);
  }

  /**
   * Método que devuelve el coste del servicio en línea
   * siendo o no premium
   * @returns number
   */
  getCost(): number {
    let cost = this.basePrice;
    if (this.isPremium) {
      cost += this.additionalFee;
    }
    return cost;
  }
}

/**
 * Clase para los servicios descargables
 */
class DownloadService extends Service {
  constructor(basePrice: number, isPremium: boolean, additionalFee: number) {
    super(basePrice, isPremium, additionalFee);
  }

  /**
   * Método que devuelve el coste del servicio descargable
   * siendo o no premium
   * @returns number
   */
  getCost(): number {
    let cost = this.basePrice;
    if (this.isPremium) {
      cost += this.additionalFee;
    }
    return cost;
  }
}

/**
 * Clase de usuarios ya registrados
 */
class RegisteredUser {
  services: Service[];

  constructor(services: Service[] = []) {
    this.services = services;
  }

  /**
   * Método que devuelve el coste total de los servicios del usuario
   * @returns number
   */
  getTotal(): number {
    let total: number = 0;
    this.services.forEach(service => {
      total += service.getCost();
    });
    return total;
  }
}
