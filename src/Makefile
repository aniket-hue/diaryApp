SENTRY_AUTH_TOKEN=02093313c9874e12a9c8cff17ad89fdbbfb1bbc5fdf0481191b7dc56cb45b78f
SENTRY_ORG=aniketdemo
SENTRY_PROJECT=aniketdemo

REACT_APP_RELEASE_VERSION=`sentry-cli releases propose-version`

setup_release: create_release upload_sourcemaps

create_release:
    sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(REACT_APP_RELEASE_VERSION)

upload_sourcemaps:
    sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files $(REACT_APP_RELEASE_VERSION) \
        upload-sourcemaps --url-prefix "~/static/js" --validate build/static/js