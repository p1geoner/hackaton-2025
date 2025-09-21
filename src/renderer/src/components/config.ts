import { theme as antdTheme, ThemeConfig } from 'antd';

export const enum EThemes {
  LIGHT = 'light',
  DARK = 'dark',
}

const colors = {
  primary: {
    [EThemes.LIGHT]: '#43861e',
    [EThemes.DARK]: '#43861e',
  },
  mainBg: {
    [EThemes.LIGHT]: '#FFFFFF',
    [EThemes.DARK]: '#141414',
  },
  secondaryBg: {
    [EThemes.LIGHT]: '#F5F5F5',
    [EThemes.DARK]: '#000000',
  },
  border: {
    [EThemes.LIGHT]: '#D9D9D9',
    [EThemes.DARK]: '#424242',
  },
  borderSecondary: {
    [EThemes.LIGHT]: '#F0F0F0',
    [EThemes.DARK]: '#303030',
  },
  // modal
  contentBg: {
    [EThemes.LIGHT]: '#FFFFFF',
    [EThemes.DARK]: '#171717',
  },
  //
  popoversBg: {
    [EThemes.LIGHT]: '#FFFFFF',
    [EThemes.DARK]: '#222222',
  },
};

export const getTHemeConfig = (theme: EThemes): ThemeConfig => {
  return {
    algorithm:
      theme === EThemes.LIGHT
        ? antdTheme.defaultAlgorithm
        : antdTheme.darkAlgorithm,
    token: {
      zIndexPopupBase: 100,
      colorLink: colors.primary[theme],
      colorPrimary: colors.primary[theme],
      colorBgBase: colors.mainBg[theme],
      colorBgContainer: colors.mainBg[theme],
      colorBgLayout: colors.secondaryBg[theme],
      colorBorder: colors.border[theme],
      colorBorderSecondary: colors.borderSecondary[theme],
      colorBgElevated: colors.popoversBg[theme],
    },
    components: {
      Layout: {
        bodyBg: colors.mainBg[theme],
        siderBg: colors.mainBg[theme],
        headerBg: colors.mainBg[theme],
        footerBg: colors.mainBg[theme],
        headerHeight: 56,
        headerPadding: '0px 32px 0px 28px',
      },
      Modal: {
        contentBg: colors.contentBg[theme],
        footerBg: colors.contentBg[theme],
        headerBg: colors.contentBg[theme],
      },
      Segmented: {
        trackBg: colors.secondaryBg[theme],
        itemSelectedBg: colors.contentBg[theme],
      },
      Form: {
        verticalLabelPadding: 0,
      },
      Message: {
        zIndexPopup: 9999,
      },
      Popconfirm: {
        zIndexPopup: 9998,
      },
      Typography: {
        titleMarginBottom: 0,
      },
      Menu: {
        itemBg: 'transparent',
      },
      Progress: {
        defaultColor: colors.primary[theme],
      },
    },
  };
};
