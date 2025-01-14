import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, Placeholder, TextControl } from '@wordpress/components';
import { getOption, checkAttr, getAttrKey, IconLabel, icons, IconToggle, UseToggle, OptionSelector, Notification, Repeater, RepeaterItem, Section, Control, AnimatedContentVisibility, generateUseToggleConfig, Collapsable } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const VideoOptions = (attributes) => {
	const {
		setAttributes,

		hideVideoPicker = false,
		hidePosterImagePicker = false,
		hideLoopToggle = false,
		hideAutoplayToggle = false,
		hideVideoControlsToggle = false,
		hideMuteToggle = false,
		hidePreloadOptions = false,
		hideCaptions = false,

		additionalControlsDesignLayout,
	} = attributes;

	const videoUrl = checkAttr('videoUrl', attributes, manifest);
	const videoPoster = checkAttr('videoPoster', attributes, manifest);
	const videoAccept = checkAttr('videoAccept', attributes, manifest);
	const videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest);
	const videoLoop = checkAttr('videoLoop', attributes, manifest);
	const videoAutoplay = checkAttr('videoAutoplay', attributes, manifest);
	const videoControls = checkAttr('videoControls', attributes, manifest);
	const videoMuted = checkAttr('videoMuted', attributes, manifest);
	const videoPreload = checkAttr('videoPreload', attributes, manifest);
	const videoSubtitleTracks = checkAttr('videoSubtitleTracks', attributes, manifest);

	const hasVideo = videoUrl?.length > 0;
	const hasPoster = videoPoster?.length > 0;

	const getTrackIcon = (kind) => {
		switch (kind) {
			case 'subtitles':
				return icons.videoSubtitle;
			case 'captions':
				return icons.closedCaptions;
			case 'descriptions':
				return icons.hide;
			case 'chapters':
				return icons.videoChapters;
		}
		return icons.emptyRect;
	};

	if (!hasVideo) {
		return (
			<UseToggle {...generateUseToggleConfig(attributes, manifest, 'videoUse')}>
				{!hideVideoPicker &&
					<Placeholder
						icon={icons.help}
						label={__('No video... yet', 'eightshift-frontend-libs')}
					>
						{__('Add one in the Block editor', 'eightshift-frontend-libs')}
					</Placeholder>
				}

				{!hideVideoPicker &&
					<MediaPlaceholder
						icon={icons.videoFile}
						onSelect={(value) => setAttributes({
							[getAttrKey('videoUrl', attributes, manifest)]: value.map(({ url, mime, mime_type }) => {
								return {
									url,
									mime: typeof (mime) === 'undefined' ? mime_type : mime,
								};
							})
						})
						}
						labels={{ title: __('Add a video', 'eightshift-frontend-libs') }}
						accept={videoAccept}
						allowedTypes={videoAllowedTypes}
						multiple
					/>
				}
			</UseToggle>
		);
	}

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'videoUse')}>
			<AnimatedContentVisibility showIf={hasPoster && !videoControls}>
				<Notification
					type='warning'
					text={__('Playback controls disabled', 'eightshift-frontend-libs')}
					subtitle={__('Poster image might prevent users from playing the video', 'eightshift-frontend-libs')}
				/>
			</AnimatedContentVisibility>

			<Control additionalClasses='es-display-flex es-content-center'>
				{videoUrl?.length > 0 &&
					<Button
						onClick={() => setAttributes({ [getAttrKey('videoUrl', attributes, manifest)]: [] })}
						icon={icons.trash}
						className='es-button-icon-24 es-slight-button-border-cool-gray-100 es-hover-slight-button-border-red-500 es-hover-color-red-500 es-rounded-1 es-nested-color-red-500 es-v-center es-content-center! es-h-18 es-w-18 es-gap-1! es-p-1! es-nested-m-0!'
					>
						{__('Remove video', 'eightshift-frontend-libs')}
					</Button>
				}
			</Control>

			<Section
				showIf={!hideLoopToggle || !hideMuteToggle || !hideAutoplayToggle || !hidePosterImagePicker || !hidePreloadOptions}
				icon={icons.playbackOptions}
				label={__('Playback options', 'eightshift-frontend-libs')}
			>
				{(!hideLoopToggle || !hideMuteToggle || !hideAutoplayToggle) &&
					<div className='es-h-spaced-wrap es-mb-3'>
						{!hideLoopToggle &&
							<IconToggle
								icon={icons.loopMode}
								label={__('Loop', 'eightshift-frontend-libs')}
								checked={videoLoop}
								onChange={(value) => setAttributes({ [getAttrKey('videoLoop', attributes, manifest)]: value })}
								type='tileButton'
							/>
						}

						{!hideAutoplayToggle &&
							<IconToggle
								icon={icons.autoplayAlt}
								label={__('Autoplay', 'eightshift-frontend-libs')}
								checked={videoAutoplay}
								onChange={(value) => setAttributes({ [getAttrKey('videoAutoplay', attributes, manifest)]: value })}
								type='tileButton'
							/>
						}

						{!hideMuteToggle &&
							<IconToggle
								icon={icons.muteCentered}
								label={__('Mute', 'eightshift-frontend-libs')}
								checked={videoMuted}
								onChange={(value) => setAttributes({ [getAttrKey('videoMuted', attributes, manifest)]: value })}
								type='tileButton'
							/>
						}
					</div>
				}

				<Collapsable label={__('Advanced', 'eightshift-frontend-libs')} icon={icons.moreH} noBottomSpacing>
					{!hidePosterImagePicker &&
						<Control
							icon={icons.videoPosterImage}
							label={__('Poster image', 'eightshift-frontend-libs')}
							subtitle={__('Visible before the video is played', 'eightshift-frontend-libs')}
						>
							{!hasPoster &&
								<MediaPlaceholder
									labels={{ title: __('Add an image', 'eightshift-frontend-libs') }}
									icon={icons.imageFile}
									onSelect={(value) => setAttributes({ [getAttrKey('videoPoster', attributes, manifest)]: value.url })}
									accept={'image/*'}
									allowedTypes={['image']}
								/>
							}

							{hasPoster &&
								<div className='es-h-center es-items-end! es-gap-0!'>
									<img
										alt={__('Video poster image', 'eightshift-frontend-libs')}
										src={videoPoster}
										className='es-h-26! es-min-w-26 es-w-auto es-border-cool-gray-100 es-rounded-2'
									/>

									<Button
										icon={icons.trashAlt}
										label={__('Remove image', 'eightshift-frontend-libs')}
										className='es-button-square-36 es-button-icon-26 es-border-cool-gray-100 es-hover-border-cool-gray-200 es-hover-color-red-500 es-rounded-1 es-nested-color-red-500 es-bg-pure-white es-shadow-sm es-hover-shadow-md -es-ml-4 -es-mb-2 es-has-animated-icon'
										onClick={() => setAttributes({ [getAttrKey('videoPoster', attributes, manifest)]: {} })}
										showTooltip
									/>
								</div>
							}
						</Control>
					}

					{!hidePreloadOptions &&
						<OptionSelector
							label={<IconLabel icon={icons.preload} label={__('Preload', 'eightshift-frontend-libs')} standalone />}
							value={videoPreload}
							options={getOption('videoPreload', attributes, manifest)}
							alignment='vertical'
							onChange={(value) => setAttributes({ [getAttrKey('videoPreload', attributes, manifest)]: value })}
							noBottomSpacing
						/>
					}
				</Collapsable>
			</Section>

			<Section showIf={!hideVideoControlsToggle || additionalControlsDesignLayout} icon={icons.design} label={__('Design & functionality', 'eightshift-frontend-libs')} additionalClasses='es-h-spaced-wrap'>
				{!hideVideoControlsToggle &&
					<IconToggle
						icon={icons.videoControls}
						label={__('Playback controls', 'eightshift-frontend-libs')}
						checked={videoControls}
						onChange={(value) => setAttributes({ [getAttrKey('videoControls', attributes, manifest)]: value })}
						type='tileButton'
					/>
				}

				{additionalControlsDesignLayout}
			</Section>

			<Section showIf={!hideCaptions} icon={icons.a11y} label={__('Accessibility', 'eightshift-frontend-libs')} noBottomSpacing>
				<Repeater
					icon={icons.videoSubtitleAlt}
					label={__('Captions', 'eightshift-frontend-libs')}

					items={videoSubtitleTracks}
					attributeName={getAttrKey('videoSubtitleTracks', attributes, manifest)}
					setAttributes={setAttributes}
					noBottomSpacing
				>
					{videoSubtitleTracks.map((item, index) => {
						return (
							<RepeaterItem
								key={item.id}
								icon={getTrackIcon(item?.kind)}
								title={item?.label ? sprintf(__('Track %d', 'eightshift-frontend-libs'), index + 1) : <i>{__('New track', 'eightshift-frontend-libs')}</i>}
								subtitle={item?.label}
								additionalLabelClass={!item?.label ? 'es-nested-color-orange-500!' : ''}
							>
								{!videoSubtitleTracks[index].src &&
									<MediaPlaceholder
										accept={['.vtt', 'text/vtt']}
										labels={{ title: __('Track file', 'eightshift-frontend-libs') }}
										onSelect={
											(track) => {
												const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
												modifiedVideoSubtitleTracks[index].src = track.url;
												setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
											}
										}
									>
										{__('Upload a VTT file containing captions, subtitles, descriptions or chapters for this video', 'eightshift-frontend-libs')}
									</MediaPlaceholder>
								}

								{videoSubtitleTracks[index].src &&
									<>
										<TextControl
											label={<IconLabel icon={icons.titleGeneric} label={__('Label', 'eightshift-frontend-libs')} />}
											help={__('Shows in the list of available tracks', 'eightshift-frontend-libs')}
											value={videoSubtitleTracks[index].label}
											onChange={(label) => {
												const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
												modifiedVideoSubtitleTracks[index].label = label;
												setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
											}}
										/>

										<OptionSelector
											label={<IconLabel icon={icons.optionListAlt} label={__('Type', 'eightshift-frontend-libs')} />}
											value={videoSubtitleTracks[index].kind}
											options={getOption('videoSubtitleTrackKind', attributes, manifest)}
											onChange={(kind) => {
												const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
												modifiedVideoSubtitleTracks[index].kind = kind;
												setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
											}}
											alignment='vertical'
										/>

										<TextControl
											label={<IconLabel icon={icons.flag} label={__('Language code', 'eightshift-frontend-libs')} />}
											help={
												<>
													{__('Should follow IETF (BCP47).', 'eightshift-frontend-libs')}
													{videoSubtitleTracks[index].kind === 'subtitles' && ' ' + __('Required.', 'eightshift-frontend-libs')}
												</>
											}
											value={videoSubtitleTracks[index].srclang}
											onChange={(srclang) => {
												const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
												modifiedVideoSubtitleTracks[index].srclang = srclang;
												setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
											}}
										/>

										<hr className='es-mt-0!' />

										<span className='es-display-block es-mb-1'>{__('List of language tags', 'eightshift-frontend-libs')}</span>

										<Button
											href='https://en.wikipedia.org/wiki/IETF_language_tag#List_of_major_primary_language_subtags'
											target='_blank'
											rel='external'
											icon={icons.externalLink}
											className='es-button-icon-18 es-p-0! es-h-8! es-rounded-0.75!'
										>
											{__('Common languages', 'eightshift-frontend-libs')}
										</Button>

										<Button
											href='https://r12a.github.io/app-subtags/'
											target='_blank'
											rel='external'
											icon={icons.externalLink}
											className='es-button-icon-18 es-p-0! es-h-8! es-rounded-0.75!'
										>
											{__('All languages', 'eightshift-frontend-libs')}
										</Button>
									</>
								}
							</RepeaterItem>
						);
					})}
				</Repeater>

				<AnimatedContentVisibility showIf={videoAutoplay && !videoMuted && !videoControls} additionalContainerClasses='es-mt-3'>
					<Notification
						type='warning'
						text={__('Video plays automatically, with sound, and without controls', 'eightshift-frontend-libs')}
						subtitle={__('This will bother most users and is an accessibility issue. Consider changing some of the options.', 'eightshift-frontend-libs')}
						iconOverride={icons.a11yWarning}
						noBottomSpacing
					/>
				</AnimatedContentVisibility>
			</Section>
		</UseToggle >
	);
};
