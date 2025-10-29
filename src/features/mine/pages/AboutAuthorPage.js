import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking, Share} from 'react-native';
import CommonHeader from 'shared/components/CommonHeader';
import {getRealDP} from 'utils/screenUtil';
import Ionicons from "react-native-vector-icons/Ionicons";
import Color from 'utils/Color';

const AboutAuthorPage = ({navigation}) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleOpenLink = (url) => {
    console.log('使用WebviewScreen打开链接:', url);
    navigation.navigate('WebviewScreen', {url});
  };

  const handlePlayGame = () => {
    console.log('玩口令功能');
  };

  const handleShare = () => {
    Share.share({
      message: '来看看这个优秀的Android开发项目！',
      url: 'https://github.com/OkAndGreat',
      title: 'WanAndroid RN'
    });
  };

  const renderLinkItem = (icon, label, value, url) => (
    <TouchableOpacity 
      style={styles.linkItem} 
      onPress={() => {
        console.log('链接项被点击:', label, url);
        if (url) {
          handleOpenLink(url);
        }
      }}
      activeOpacity={url ? 0.7 : 1}
    >
      <Ionicons name={icon} size={getRealDP(24)} color={Color.THEME} style={styles.linkIcon} />
      <Text style={styles.linkLabel}>{label}</Text>
      <Text style={styles.linkValue}>{value}</Text>
      {url && <Ionicons name="chevron-forward-outline" size={getRealDP(20)} color="#ccc" />}
    </TouchableOpacity>
  );

  const renderSkillTag = (skill) => (
    <View style={styles.skillTag}>
      <Text style={styles.skillText}>{skill}</Text>
    </View>
  );

  const renderProjectItem = (name, description, url) => (
    <TouchableOpacity 
      style={styles.projectItem}
      onPress={() => handleOpenLink(url)}
      activeOpacity={0.7}
    >
      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{name}</Text>
        <Text style={styles.projectDescription}>{description}</Text>
      </View>
      <Ionicons name="open-outline" size={getRealDP(20)} color={Color.THEME} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CommonHeader 
        headerTitle="关于作者" 
        leftIconName="chevron-back-outline"
        onLeftIconPress={handleBack}
        rightIconName="share-outline"
        onRightIconPress={handleShare}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.authorInfo}>
          <Image 
            source={{uri: 'https://img2.woyaogexing.com/2025/04/11/6a14c046f85679fd01836abc7162c9e6.jpg'}} 
            style={styles.avatar} 
          />
          <Text style={styles.authorName}>okandgreat</Text>
          <Text style={styles.authorMotto}>不相信自己的人，没有努力的价值</Text>
          <View style={styles.authorStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5+</Text>
              <Text style={styles.statLabel}>年经验</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10+</Text>
              <Text style={styles.statLabel}>项目</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1000+</Text>
              <Text style={styles.statLabel}>用户</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>个人简介</Text>
          <Text style={styles.bioText}>
            热爱编程的全栈开发者，专注于Android开发和React Native跨平台开发。
            对开源社区充满热情，致力于分享知识和经验。
          </Text>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>技能标签</Text>
          <View style={styles.skillsContainer}>
            {renderSkillTag('Android')}
            {renderSkillTag('React Native')}
            {renderSkillTag('JavaScript')}
            {renderSkillTag('TypeScript')}
            {renderSkillTag('Java')}
            {renderSkillTag('Kotlin')}
            {renderSkillTag('Redux')}
            {renderSkillTag('Git')}
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>开源项目</Text>
          {renderProjectItem('WanAndroid RN', '基于React Native开发的WanAndroid客户端', 'https://github.com/OkAndGreat')}
          {renderProjectItem('AndroidUtils', 'Android开发常用工具类库', 'https://github.com/OkAndGreat')}
          {renderProjectItem('RNComponents', 'React Native组件库', 'https://github.com/OkAndGreat')}
        </View>
        
        <View style={styles.linksContainer}>
          <Text style={styles.sectionTitle}>联系方式</Text>
          {renderLinkItem("logo-github", "Github", "OkAndGreat", 'https://github.com/OkAndGreat')}
          {renderLinkItem("book-outline", "简书", "OkAndGreat", 'https://github.com/OkAndGreat')}
          {renderLinkItem("chatbubbles-outline", "QQ群", "OkAndGreat", 'https://github.com/OkAndGreat')}
          {renderLinkItem("mail-outline", "邮箱", "contact@example.com", 'mailto:contact@example.com')}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>致谢</Text>
          <Text style={styles.acknowledgmentText}>
            感谢所有使用本应用的用户，感谢开源社区的贡献者们，
            特别感谢鸿洋大神提供的WanAndroid API。
          </Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>- 感谢您的支持 -</Text>
          <Text style={styles.versionText}>版本 v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: getRealDP(40),
  },
  authorInfo: {
    alignItems: 'center',
    paddingVertical: getRealDP(40),
    backgroundColor: 'white',
    marginBottom: getRealDP(20),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: getRealDP(100),
    height: getRealDP(100),
    borderRadius: getRealDP(50),
    marginBottom: getRealDP(20),
  },
  authorName: {
    fontSize: getRealDP(22),
    fontWeight: '600',
    color: '#333',
    marginBottom: getRealDP(8),
  },
  authorMotto: {
    fontSize: getRealDP(14),
    color: '#888',
    fontStyle: 'italic',
    marginBottom: getRealDP(20),
  },
  authorStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: getRealDP(40),
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: getRealDP(18),
    fontWeight: 'bold',
    color: Color.THEME,
  },
  statLabel: {
    fontSize: getRealDP(12),
    color: '#666',
    marginTop: getRealDP(4),
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: getRealDP(8),
    marginHorizontal: getRealDP(16),
    marginBottom: getRealDP(16),
    padding: getRealDP(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: getRealDP(18),
    fontWeight: '600',
    color: '#333',
    marginBottom: getRealDP(12),
  },
  bioText: {
    fontSize: getRealDP(14),
    color: '#666',
    lineHeight: getRealDP(22),
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: getRealDP(8),
  },
  skillTag: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: getRealDP(12),
    paddingVertical: getRealDP(6),
    borderRadius: getRealDP(16),
    marginRight: getRealDP(8),
    marginBottom: getRealDP(8),
  },
  skillText: {
    fontSize: getRealDP(12),
    color: Color.THEME,
  },
  projectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getRealDP(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: getRealDP(16),
    fontWeight: '500',
    color: '#333',
    marginBottom: getRealDP(4),
  },
  projectDescription: {
    fontSize: getRealDP(13),
    color: '#666',
  },
  linksContainer: {
    backgroundColor: 'white',
    borderRadius: getRealDP(8),
    marginHorizontal: getRealDP(16),
    paddingHorizontal: getRealDP(16),
    paddingVertical: getRealDP(8),
    marginBottom: getRealDP(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getRealDP(18),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkIcon: {
    marginRight: getRealDP(16),
  },
  linkLabel: {
    fontSize: getRealDP(16),
    color: '#444',
    flex: 1,
  },
  linkValue: {
    fontSize: getRealDP(15),
    color: '#999',
    marginRight: getRealDP(8),
  },
  acknowledgmentText: {
    fontSize: getRealDP(14),
    color: '#666',
    lineHeight: getRealDP(22),
  },
  footer: {
    alignItems: 'center',
    marginTop: getRealDP(20),
  },
  footerText: {
    fontSize: getRealDP(13),
    color: '#bbb',
    marginBottom: getRealDP(4),
  },
  versionText: {
    fontSize: getRealDP(12),
    color: '#ddd',
  },
});

export default AboutAuthorPage;