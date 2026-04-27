// app/(tabs)/news.tsx
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { t } from '../../constants/i18n';
import { NEWS_API_KEY, buildNewsEndpoint } from '../../constants/news';
import { useLangContext } from '../../hooks/LanguageContext';

type Article = {
  title: string;
  description: string | null;
  url: string;
  source: { name: string };
  publishedAt: string;
};

export default function NewsScreen() {
  const { lang } = useLangContext();   // instead of useLanguage()
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      const url = buildNewsEndpoint(lang); // language‑specific endpoint

      try {
        const res = await fetch(url, {
          headers: { 'X-Api-Key': NEWS_API_KEY },
        });
        const json = await res.json();

        if (json.status === 'error') {
          setError(json.message || 'News API error');
        } else if (Array.isArray(json.articles)) {
          setArticles(json.articles);
        } else {
          setError('No articles found');
        }
      } catch (e: any) {
        setError('Network error, please try again.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [lang]); // re‑fetch when app language changes



  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity
      onPress={() => Linking.openURL(item.url)}
      style={styles.card}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{item.title}</Text>
      {item.description ? (
        <Text style={styles.desc} numberOfLines={3}>
          {item.description}
        </Text>
      ) : null}
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>
          {t(lang, 'news_source')}: {item.source?.name ?? 'Unknown'}
        </Text>
        <Text style={styles.metaText}>
          {new Date(item.publishedAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#22c55e" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>{t(lang, 'news_title')}</Text>
      <Text style={styles.subtitle}>{t(lang, 'news_subtitle')}</Text>

      {articles.length === 0 ? (
        <Text style={styles.empty}>{t(lang, 'news_empty')}</Text>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => item.url + index}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F6EE', paddingHorizontal: 14, paddingTop: 8 },
  heading: {
    fontFamily: 'Antonio-Bold',
    color: '#051650',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: { fontFamily: 'PlayfairDisplay-Regular', color: '#020202ff', fontSize: 17, marginBottom: 8 },
  card: {
    backgroundColor: '#F7F6EE',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E7DECC',
    padding: 12,
    marginBottom: 10,
  },
  title: { fontFamily: 'Antonio-Bold', color: '#051650', fontSize: 20, fontWeight: '600', marginBottom: 4 },
  desc: { color: '#9ca3af', fontSize: 15, marginBottom: 6 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { color: '#0b0b0bff', fontSize: 11 },
  center: {
    flex: 1,
    backgroundColor: '#F7F6EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: { color: '#fca5a5' },
  empty: { color: '#9ca3af', marginTop: 10 },
});
