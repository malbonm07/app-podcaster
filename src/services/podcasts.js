import http from '@/utils/http';
import api from '@/utils/api';

export function getPodcasts() {
    return http.get(api.podcasts)
}