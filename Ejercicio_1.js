/**
 * Pseudocodigo de ejemplo
 */
class RegisteredUser {
    constructor (services = []) {
        this.services = services;
    }

    getTotal () {
        let total = 0;

        this.services.forEach(service, index => {
            let multimediaContent = service.getMultimediaContent();

            if (typeof service == StreamingService) {
                total += multimediaContent.streamingPrice;
            } else if (typeof service == DownloadService) {
                total += multimediaContent.downloadPrice;
            }

            if (typeof multimediaContent == PremiumContent) {
                total += multimediaContent.additionalFee;
            }
        })

        return total;
    }
}