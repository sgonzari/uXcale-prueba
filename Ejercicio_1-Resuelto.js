class MultimediaContent {
  constructor(title, streamingPrice, downloadPrice, duration, adult, size) {
    this.title = title;
    this.streamingPrice = streamingPrice;
    this.downloadPrice = downloadPrice;
    this.duration = duration;
    this.adult = adult;
    this.size = size;
  }
}

class PremiumContent extends MultimediaContent {
  constructor(title, streamingPrice, downloadPrice, duration, adult, size, additionalFee) {
    super(title, streamingPrice, downloadPrice, duration, adult, size);
    this.additionalFee = additionalFee;
  }
}

class Service {
  constructor(timestamp, content) {
    this.timestamp = timestamp;
    this.content = content;
  }

  getCost() { }

  getMultimediaContent() {
    return this.content;
  }
}

class StreamingService extends Service {
  getCost() {
    let content = this.getMultimediaContent();

    let cost = content.streamingPrice;
    if (content instanceof PremiumContent) {
      cost += content.additionalFee;
    }

    return cost;
  }
}

class DownloadService extends Service {
  getCost() {
    let content = this.getMultimediaContent();

    let cost = content.downloadPrice;
    if (content instanceof PremiumContent) {
      cost += content.additionalFee;
    }

    return cost;
  }
}

class RegisteredUser {
  constructor(email, password, registration, adult, services = []) {
    this.email = email;
    this.password = password;
    this.registration = registration;
    this.adult = adult;
    this.services = services;
  }

  getTotal() {
    let total = 0;

    this.services.forEach(service => {
      total += service.getCost();
    });

    return total;
  }
}

// Test
const content = new MultimediaContent('Content 1', 5.0, 10.0, 140, false, 1500);
const premiumContent = new PremiumContent('Content 2', 5.0, 10.0, 140, true, 2000, 5.0);

const streamingService = new StreamingService(new Date(), content);
const downloadService = new DownloadService(new Date(), premiumContent);

const user = new RegisteredUser('user@example.com', 'password123', new Date(), true, [streamingService, downloadService]);

console.log(user.getTotal());
