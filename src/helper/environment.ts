declare type rule = [string, RegExp];

interface RuleObject {
  name: string;
  rule: RegExp;
}

interface DetectResult {
  os?: string;
  bot?: boolean;
  name?: string;
  version?: string;
}

const BROWSER_RULES_REG = [
  ['aol', /AOLShield\/([0-9\._]+)/],
  ['edge', /Edge\/([0-9\._]+)/],
  ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
  ['vivaldi', /Vivaldi\/([0-9\.]+)/],
  ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
  ['samsung', /SamsungBrowser\/([0-9\.]+)/],
  ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
  ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
  ['fxios', /FxiOS\/([0-9\.]+)/],
  ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
  ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
  ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ['ie', /MSIE\s(7\.0)/],
  ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ['android', /Android\s([0-9\.]+)/],
  ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ['safari', /Version\/([0-9\._]+).*Safari/],
  ['facebook', /FBAV\/([0-9\.]+)/],
  ['instagram', /Instagram\s([0-9\.]+)/],
  ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/]
] as rule[];

const OS_RULES_REG = [
  ['iOS', /iP(hone|od|ad)/],
  ['Android OS', /Android/],
  ['BlackBerry OS', /BlackBerry|BB10/],
  ['Windows Mobile', /IEMobile/],
  ['Amazon OS', /Kindle/],
  ['Windows 3.11', /Win16/],
  ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
  ['Windows 98', /(Windows 98)|(Win98)/],
  ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
  ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
  ['Windows Server 2003', /(Windows NT 5.2)/],
  ['Windows Vista', /(Windows NT 6.0)/],
  ['Windows 7', /(Windows NT 6.1)/],
  ['Windows 8', /(Windows NT 6.2)/],
  ['Windows 8.1', /(Windows NT 6.3)/],
  ['Windows 10', /(Windows NT 10.0)/],
  ['Windows ME', /Windows ME/],
  ['Open BSD', /OpenBSD/],
  ['Sun OS', /SunOS/],
  ['Linux', /(Linux)|(X11)/],
  ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
  ['QNX', /QNX/],
  ['BeOS', /BeOS/],
  ['OS/2', /OS\/2/],
  [
    'Search Bot',
    /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/
  ]
] as rule[];

function buildRules(ruleTuples: rule[]): RuleObject[] {
  return ruleTuples.map(function(tuple) {
    return {
      name: tuple[0],
      rule: tuple[1]
    };
  });
}

export const BROWSER_RULES = buildRules(BROWSER_RULES_REG);
export const OS_RULES = buildRules(OS_RULES_REG);

export const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

export function getNodeVersion() {
  return (
    isNode && {
      name: 'node',
      version: process.version.slice(1),
      os: process.platform
    }
  );
}

function parseUserAgent(userAgentString) {
  if (!userAgentString) {
    return null;
  }
  let detected = (BROWSER_RULES.map(function(browser) {
    let match = browser.rule.exec(userAgentString);
    let version =
      match && (match[1].split(/[._]/).slice(0, 3) as (number | string)[]);

    if (version && version.length < 3) {
      version = version.concat(version.length == 1 ? [0, 0] : [0]);
    }

    return (
      match && {
        name: browser.name,
        version: version.join('.')
      }
    );
  }).filter(Boolean)[0] || null) as DetectResult;

  if (detected) {
    detected.os = detectOS(userAgentString);
  }

  if (
    /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(
      userAgentString
    )
  ) {
    detected = detected || {};
    detected.bot = true;
  }

  return detected;
}

export function detect() {
  if (typeof navigator !== 'undefined') {
    return parseUserAgent(navigator.userAgent);
  }

  return getNodeVersion();
}

function detectOS(userAgentString) {
  let detected = BROWSER_RULES.filter(function(os) {
    return os.rule && os.rule.test(userAgentString);
  })[0];

  return detected ? detected.name : null;
}
