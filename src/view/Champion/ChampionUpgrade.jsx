import './ChampionUpgrade.scss';
import { STAR_RANK_LEVEL, CATALYSTS, CATALYST } from '../../data/model/Champion';
import classnames from 'classnames';
import { IMAGE_BADGE_RANK_UP, IMAGE_BADGE_LEVEL_MAX } from '../../util/images';
import ImageIcon from '../ImageIcon.jsx';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionUpgrade = {
    view(ctrl, { stars, rank, level, typeId }) {
        const definitionStars = STAR_RANK_LEVEL[ stars ];
        const definitionRank = definitionStars[ rank ];
        const isMaxed = definitionStars.ranks === rank && definitionRank.levels === level;
        const isRankUp = definitionStars.ranks > rank && definitionRank.levels === level;
        const catalysts = CATALYSTS[ stars ] && CATALYSTS[ stars ][ rank ];
        return (
            <div
                m="ChampionUpgrade"
                title={ lang.get('upgrade-cost') }
                class={ classnames('champion-upgrade', {
                    'champion-upgrade-rank-up': isRankUp,
                    'champion-upgrade-max': isMaxed,
                }) }
            >
                { (isMaxed)? (
                    <span class="champion-upgrade-catalyst">
                        { lang.get('upgrade-maxed') }
                    </span>
                ):
                (!catalysts)? (
                    <span class="champion-upgrade-catalyst">
                        { lang.get('upgrade-max-rank') }
                    </span>
                ):
                catalysts.map(({ tier, type, amount }) => (
                    <span
                        class={ classnames('champion-upgrade-catalyst', `champion-upgrade-catalyst--${ type }`, {
                            [ `champion-upgrade-catalyst--class-${ typeId }` ]: type === CATALYST.CLASS,
                        }) }
                    >
                        { amount } x
                        <ImageIcon
                            src={ (type === CATALYST.GOLD)? 'images/catalysts/gold.png':
                                (type === CATALYST.CLASS)? `images/catalysts/tier_${ tier }_${ typeId }.png`:
                                `images/catalysts/tier_${ tier }_${ type }.png`
                            }
                            icon={ (type === CATALYST.GOLD)? 'circle': 'share-alt' }
                            after
                        />
                    </span>
                )) }
                { isMaxed? (
                    <div class={ classnames('champion-upgrade-badge', 'champion-upgrade-badge--max') }>
                        <ImageIcon src={ IMAGE_BADGE_LEVEL_MAX } />
                    </div>
                ): isRankUp? (
                    <div class={ classnames('champion-upgrade-badge', 'champion-upgrade-badge--rank-up') }>
                        <ImageIcon src={ IMAGE_BADGE_RANK_UP } />
                    </div>
                ): null }
            </div>
        );
    },
};

export default ChampionUpgrade;
