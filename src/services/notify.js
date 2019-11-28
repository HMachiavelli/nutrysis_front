import { NotificationManager } from 'react-notifications';

const notify = {
    error: (message, title) => {
        NotificationManager.error(message, title, 5000);
    }
}

export default notify;