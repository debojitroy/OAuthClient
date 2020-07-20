import { createBrowserHistory } from 'history';

const localHistory = createBrowserHistory();

export const getHistory = () => {
	return localHistory;
};
