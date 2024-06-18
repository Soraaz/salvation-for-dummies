import { lazy, useEffect } from 'react';
import buildInfo from '../../build-info.json';

const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem('page-has-been-force-refreshed') || 'false'
    );

    try {
      const component = await componentImport();

      window.localStorage.setItem('page-has-been-force-refreshed', 'false');

      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        // Assuming that the user is not on the latest version of the application.
        // Let's refresh the page immediately.
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
        window.localStorage.setItem('page-has-been-force-refreshed', 'true');
        return window.location.reload();
      }

      // The page has already been reloaded
      // Assuming that user is already using the latest version of the application.
      // Let's let the application crash and raise the error.
      throw error;
    }
  });

const useRefreshCacheOnNewVersion = () => {
  useEffect(() => {
    const version = localStorage.getItem('version');

    console.log(version, buildInfo.buildDate);
    if (version !== buildInfo.buildDate) {
      if ('caches' in window) {
        caches.keys().then((names) => {
          // Delete all the cache files
          names.forEach((name) => {
            caches.delete(name);
          });
        });

        // Makes sure the page reloads. Changes are only visible after you refresh.
        window.location.reload(true);
      }

      localStorage.clear();
      localStorage.setItem('version', buildInfo.buildDate);
    }
  }, []);
};

export { lazyWithRetry, useRefreshCacheOnNewVersion };
